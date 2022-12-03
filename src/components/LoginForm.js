import { useState } from 'react'
import loginService from '../services/login'
import PropTypes from 'prop-types'

const LoginForm = ({ onSubmit, onError }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const usernameInputHanlder = e => setUsername(e.target.value)
  const passwordInputHanlder = e => setPassword(e.target.value)

  const submitHandler = async e => {
    e.preventDefault()

    try {
      const userData = { username, password }
      const user = await loginService.login(userData)
      onSubmit(user)
      setUsername('')
      setPassword('')
      console.log('login complete')
    } catch (error) {
      onError({ type: 'error', message: 'invalid username or password' })
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

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired
}

export default LoginForm