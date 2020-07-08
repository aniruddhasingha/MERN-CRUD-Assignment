require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwtDecode = require('jwt-decode');
const mongoose = require('mongoose');
const jwt = require('express-jwt')
const cookieParser = require('cookie-parser')
const User = require('./models/User');


const {
    createToken,
    hashPassword,
    verifyPassword
} = require('./util');
const { response } = require('express');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/api/authenticate', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            email
        }).lean();

        if (!user) {
            return res.status(403).json({
                message: 'Wrong email or password.'
            });
        }

        const passwordValid = await verifyPassword(
            password,
            user.password
        );

        if (passwordValid) {
            const { password, bio, ...rest } = user;
            const userInfo = Object.assign({}, { ...rest });

            const token = createToken(userInfo);

            const decodedToken = jwtDecode(token);
            const expiresAt = decodedToken.exp;
            // res.cookie('token', token, {
            //     httpOnly: true
            // })
            res.json({
                message: 'Authentication successful!',
                token,
                userInfo,
                expiresAt
            });
        } else {
            res.status(403).json({
                message: 'Wrong email or password.'
            });
        }
    } catch (err) {
        console.log(err);
        return res
            .status(400)
            .json({ message: 'Something went wrong.' });
    }
});

app.post('/api/signup', async (req, res) => {
    try {
        const { email, firstName, lastName } = req.body;
        const hashedPassword = await hashPassword(
            req.body.password
        );

        const userData = {
            email: email.toLowerCase(),
            firstName,
            lastName,
            password: hashedPassword
        };

        const existingEmail = await User.findOne({
            email: userData.email
        }).lean();

        if (existingEmail) {
            return res
                .status(400)
                .json({ message: 'Email already exists' });
        }

        const newUser = new User(userData);
        const savedUser = await newUser.save();

        if (savedUser) {
            const token = createToken(savedUser);
            const decodedToken = jwtDecode(token);
            const expiresAt = decodedToken.exp;

            const {
                firstName,
                lastName,
                email,
                role
            } = savedUser;

            const userInfo = {
                firstName,
                lastName,
                email,
                role
            };
            res.cookie('token', token, {
                httpOnly: true
            })
            return res.json({
                message: 'User created!',
                token,
                userInfo,
                expiresAt
            });
        } else {
            return res.status(400).json({
                message: 'There was a problem creating your account'
            });
        }
    } catch (err) {
        return res.status(400).json({
            message: 'There was a problem creating your account'
        });
    }
});


// app.use(function (err, req, res, next) {
//     if (err.name === 'UnauthorizedError') {
//         return res.status(401).json({ message: 'invalid token...' });
//     }
// });
const checkJwt = jwt({
    secret: process.env.JWT_SECRET,
    issuer: 'api.test',
    audience: 'api.test',
    // getToken: req => req.headers.token
})


app.get('/api/users', async (req, res) => {
    try {
        // console.log(req.headers)
        const users = await User.find()
            .lean()
            .select('_id firstName lastName  bio');

        res.json({
            users
        });
    } catch (err) {
        if (err.name === 'UnauthorizedError') {
            return res.status(401).json({ message: 'invalid token...' });
        }
        else {
            return res.status(400).json({
                message: 'There was a problem getting the users'
            });
        }
    }
});

app.delete('/api/deleteuser/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedItem = await User.findOneAndDelete(
            { _id: id }
        );
        res.status(201).json({
            message: 'Inventory item deleted!',
            deletedItem
        });
    } catch (err) {
        return res.status(400).json({
            message: 'There was a problem deleting the item.'
        });
    }
});


app.post('/api/bio', async (req, res) => {
    try {

        // console.log(req.body)
        const { id } = req.body;
        const { bio } = req.body;
        const updatedUser = await User.findOneAndUpdate(
            {
                _id: id
            },
            {
                bio: bio
            },
            {
                new: true
            }
        );

        res.json({
            message: 'Bio updated!',
            bio: updatedUser.bio
        });
    } catch (err) {
        return res.status(400).json({
            message: 'There was a problem updating your bio'
        });
    }
});

async function connect() {
    try {
        mongoose.Promise = global.Promise;
        await mongoose.connect(process.env.ATLAS_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
    } catch (err) {
        console.log('Mongoose error', err);
    }
    app.listen(3001);
    console.log('API listening on localhost:3001');
}

connect();