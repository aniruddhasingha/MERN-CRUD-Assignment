import React, { useContext, useEffect, useState } from 'react'
import UserTable from '../components/UserTable'
import EditUserForm from '../components/EditUserForm'
import { AuthContext } from '../context/AuthContext'
import { FetchContext } from '../context/FetchContext';
function UserDetails() {
    const auth = useContext(AuthContext);
    const { authState } = auth;
    const fetchContext = useContext(FetchContext);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(' ');
    const [editing, setEditing] = useState(false)
    const initialFormState = { id: null, bio: '' }
    const [currentBio, setCurrentBio] = useState(initialFormState)
    const fetchUsers = async () => {
        try {
            setLoading(true)
            const { data } = await fetchContext.authAxios.get('users')
            setUsers(data)
            setLoading(false)
        }
        catch (err) {
            console.log(err)
            setLoading(false)
        }
    }
    const deleteUser = async (id) => {
        try {
            if (
                window.confirm(
                    'Are you sure you want to delete this item?'
                )
            ) {
                const {
                    data
                } = await fetchContext.authAxios.delete(
                    `deleteuser/${id}`
                );

                fetchUsers()
            }
        } catch (err) {
            const { data } = err.response;
            console.log(data.message);
        }

    };
    const editBio = (user) => {
        setEditing(true)
        setCurrentBio({ id: user._id, bio: user.bio, firstName: user.firstName, lastName: user.lastName })
    }
    const setEditingFalse = () => {
        setEditing(false)
    }
    const updateBio = async req => {
        try {
            console.log('req', req)
            const { data } = await fetchContext.authAxios.post(
                'bio',
                {
                    id: req.id,
                    bio: req.bio
                }

            );
            setEditing(false)
            fetchUsers()
            console.log(data.message, data)
            // setErrorMessage(null);
            // setSuccessMessage(data.message);
        } catch (err) {
            const { data } = err.response;
            // setSuccessMessage(null);
            // setErrorMessage(data.message);
            console.log(data.message)
        }
    };
    useEffect(() => {
        fetchUsers()
    }, [])

    // console.log(users)
    return (
        <div className="container">
            <h3>Click here to logout</h3> <button style={{
                'backgroundColor': '#e7e7e7', /* Green */
                'border': '1px solid black',
                'color': 'black',
                'padding': '10px 20px',
                'text-align': 'center',
                'text-decoration': 'none',
                'display': 'inline-block',
                'font-size': '10px'
            }} onClick={auth.logout}>Logout</button>
            <h1>CRUD App with Hooks</h1>
            <div className="flex-row">
                <div className="flex-large">
                    {editing ? (<>
                        <h2>Add Bio</h2>
                        <EditUserForm currentBio={currentBio} updateBio={updateBio} setEditing={setEditing} setEditingFalse={setEditingFalse} />
                    </>) : null}

                </div>
                <div className="flex-large">
                    <h2>View users</h2>
                    <UserTable data={users.users} loading={loading} deleteUser={deleteUser} editBio={editBio} />
                </div>
            </div>
        </div>
    )
}

export default UserDetails
