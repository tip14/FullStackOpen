const LoginForm = ({onSubmitLoginForm, username, password, onUsernameChange, onPasswordChange}) => {
    return (
        <>
            <h3>log in to application</h3>
            <form>
                <p>username <input type="text" value={username} onChange={onUsernameChange}/></p>
                <p>password <input type="password" value={password} onChange={onPasswordChange}/></p>
                <input type="submit" onClick={onSubmitLoginForm} value="login"/>
            </form>
        </>
    )
}

export default LoginForm