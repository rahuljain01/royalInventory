import { useRef } from 'react';
import Card from '../../components/Card/Card';
import CtaButton from '../../components/CtaButton/CtaButton';
import './Login.css'
import {login} from '../../store/auth-api'
import { useHistory } from 'react-router-dom'

const Login = (props) => {

const userNameRef = useRef()
const passwordRef = useRef()

const history = useHistory()

const submitHandler = (event) => {
    event.preventDefault()

    login(userNameRef.current.value, passwordRef.current.value).then((data) => {
        props.onLogin()
        history.push("/dashboard")
    }).catch(() => {

    })
}

    return <div className="login-wrapper">
        <Card className='login-card'>
      <h1>Please Log In</h1>
      <form style={{width:'100%'}} onSubmit={submitHandler}>
          <div className='form-div'>
        <label style={{width:'90%'}}>
          <p className='login-label'>Username</p>
          <input className='login-input' type="text" ref={userNameRef}/>
        </label>
        <label style={{width:'90%'}}>
          <p className='login-label'>Password</p>
          <input className='login-input' type="password" ref={passwordRef}/>
        </label>
        <div className='submit-wrapper'>
          <CtaButton type="submit">Submit</CtaButton>
        </div>
        </div>
      </form>
      </Card>
    </div>
  }

  export default Login;