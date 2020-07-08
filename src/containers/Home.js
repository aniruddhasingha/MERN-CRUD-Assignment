import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function Home() {
    const authContext = useContext(AuthContext)
    return (
        <div>
            <h1>Welcome To Home Page</h1>
            <br />
            <h3>Already User Click Button To Login     <Link to="/login">Login</Link></h3>

            <br />
            <h3>New User Click Button To Signup        <Link to="/signup">Signup</Link></h3>

            <br />

            {/* <h3>To Enter User Details</h3> */}
            <br />
            {console.log(authContext.isAuthenticated())}
            <h3> To Enter User Details <Link to={authContext.isAuthenticated() ? '/userDetails' : '/signup'} >Click</Link></h3>
        </div>
    )
}

export default Home
