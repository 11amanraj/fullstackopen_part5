import { useState } from "react"
import loginService from '../services/login'

const LoginForm = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const usernameInputHanlder = e => setUsername(e.target.value)
    const passwordInputHanlder = e => setPassword(e.target.value)

    const submitHandler = async e => {
        e.preventDefault()
        
        try {
            const userData = { username, password }
            const user = await loginService.login(userData)
            console.log(user.name)
            props.loginHandler({
                status: true,
                name: user.name
            })
            console.log('login complete')
            setUsername('')
            setPassword('')
        } catch (error) {
            console.log('invalid username or password')
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <div>
                <label>Username</label>
                <input onChange={usernameInputHanlder}></input>
            </div>
            <div>
                <label>Password</label>
                <input type='password' onChange={passwordInputHanlder}></input>
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}

export default LoginForm