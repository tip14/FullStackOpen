import React from 'react'

const UserInfo = ({ user, logout }) => {
    return <p>{user.name} logged in <button onClick={logout}>logout</button></p>
}

export default UserInfo