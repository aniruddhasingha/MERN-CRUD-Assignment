import React, { useState } from 'react'
import { Form, Formik, Field, ErrorMessage } from "formik";

const EditUserForm = (props) => {
    const [user, setBio] = useState(props.currentBio)
    // console.log('user', user.bio)

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setBio({ ...user, [name]: value })
    }
    return (
        <form onSubmit={(event) => {
            event.preventDefault()
            props.updateBio(user)
        }}>
            <label>Edit User Bio For {user.firstName} {user.lastName}</label>
            <br />
            <br />
            <input
                type="text"
                name="bio"
                value={user.bio}
                onChange={handleInputChange}
                style={{
                    'width': '20%',
                    'padding': '12px 20px',
                    'margin': '8px 8px',
                    'box-sizing': 'border-box'
                }}
            />
            <br />
            <br />
            <button style={{

                'backgroundColor': '#4CAF50', /* Green */
                'border': '1px solid black',
                'color': 'white',
                'padding': '10px 20px',
                'text-align': 'center',
                'text-decoration': 'none',
                'display': 'inline-block',
                'font-size': '10px'
            }}
                onClick={() => props.setEditing}
            >Add new Bio</button>
            <br />
            <br />
            <button
                style={{

                    'backgroundColor': ' #f44336', /* Green */
                    'border': '1px solid black',
                    'color': 'white',
                    'padding': '10px 20px',
                    'text-align': 'center',
                    'text-decoration': 'none',
                    'display': 'inline-block',
                    'font-size': '10px'
                }}
                onClick={() => props.setEditingFalse}
            >Cancel</button>
        </form>
    )
}


export default EditUserForm
