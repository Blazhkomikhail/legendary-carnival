import React, { ReactElement, useState } from "react";
import { checkUser } from '../../api/api';
import { useHistory } from 'react-router-dom';
import { login } from '../../api/api';

const Authorisation = (): ReactElement => {
  const [userLogin, setUserLogin] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  if (localStorage.getItem('loginData')) {
    const userId = JSON.parse(localStorage.getItem('loginData')).user.id;
    
    checkUser().then(response => {
      if (response.id === userId) {
        history.push('/admin');        
      }
    })
  }

  const submitHandle = async () => {
    const reqBody = {
      username: userLogin,
      password: password
    }

    const response = await login(reqBody);
    if (!response.token) {
        console.error('Something went wrong, try again later');
        return;
    }
      localStorage.setItem('loginData', JSON.stringify(response));
      history.push('/admin');
    }
  
  return (
    <div className="auth-window">
      <h3 className="auth-heading">Authorisation</h3>
      <form className="auth-form" onSubmit={submitHandle}>
        <label htmlFor="login">
          Login:
          <input
            id="login"
            type="text" 
            className="auth-login" 
            onChange={(event) => setUserLogin(event.target.value)}  
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            id="password"
            type="password" 
            className="auth-password" 
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <input type="submit" value="Ok"/>
      </form>
    </div>
  )
}

export default Authorisation;