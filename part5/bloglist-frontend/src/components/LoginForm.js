import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ onSubmitLoginForm, username, password, onUsernameChange, onPasswordChange }) => {

    LoginForm.propTypes = {
        onUsernameChange: PropTypes.func.isRequired,
        onPasswordChange: PropTypes.func.isRequired,
        onSubmitLoginForm: PropTypes.func.isRequired,
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }


    return (

        <form>
            <p>username <input type="text" value={username} onChange={onUsernameChange} /></p>
            <p>password <input type="password" value={password} onChange={onPasswordChange} /></p>
            <input type="submit" onClick={onSubmitLoginForm} value="login" />
        </form>
    )
}

export default LoginForm