import React from 'react'

const UserTable = ({ data, loading, deleteUser, editBio }) => {

    if (loading) {
        return <h2>Loading...</h2>
    }
    else {
        // console.log(data)
        return (
            <table style={{
                'border': '1px solid black'
            }}>
                <thead >
                    <tr>
                        <th style={{
                            'border': '1px solid black'
                        }}>First Name</th>
                        <th style={{
                            'border': '1px solid black'
                        }}>Last Name</th>
                        <th style={{
                            'border': '1px solid black'
                        }}>Bio</th>
                        <th style={{
                            'border': '1px solid black'
                        }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (data.map((user) => (
                        <tr key={user._id}>
                            <td style={{
                                'border': '1px solid black'
                            }}>{user.firstName}</td>
                            <td style={{
                                'border': '1px solid black'
                            }}>{user.lastName}</td>
                            <td style={{
                                'border': '1px solid black'
                            }}>{user.bio}</td>
                            <td style={{
                                'border': '1px solid black'
                            }}>
                                <button onClick={() => editBio(user)
                                }>Edit</button>
                                <button onClick={() => deleteUser(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))) : (<tr>
                        <td style={{
                            'border': '1px solid black'
                        }}>No Users</td>
                    </tr>)}
                </tbody>
            </table>
        )
    }
}

export default UserTable
