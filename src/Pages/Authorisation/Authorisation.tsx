import React, { ReactElement, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { checkUser, login } from '../../api/api';
import './authorisation.scss';

const Authorisation = (): ReactElement => {
  const [userLogin, setUserLogin] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const history = useHistory();

  if (localStorage.getItem('loginData')) {
    const userId = JSON.parse(localStorage.getItem('loginData')).user.id;

    checkUser().then((response) => {
      if (response.id === userId) {
        history.push('/admin');
      }
    });
  }

  const submitHandle = async () => {
    const reqBody = {
      username: userLogin,
      password: userPassword,
    };

    const response = await login(reqBody);
    if (!response.token) {
      console.error('Something went wrong, try again later');
      history.push('/');
      return;
    }
    localStorage.setItem('loginData', JSON.stringify(response));
    history.push('/admin');
  };

  return (
    <div className="auth-window">
      <h3 className="auth-heading">Authorisation</h3>
      <form className="auth-form">
        <label className="auth-form__login" htmlFor="login">
          Login (admin):
          <input
            id="login"
            type="text"
            className="auth-login"
            onChange={(event) => setUserLogin(event.target.value)}
          />
        </label>
        <label htmlFor="password">
          Password (admin):
          <input
            id="password"
            type="password"
            className="auth-password"
            onChange={(event) => setUserPassword(event.target.value)}
          />
        </label>
        <button type="button" onClick={submitHandle}>
          OK
        </button>
      </form>
    </div>
  );
};

export default Authorisation;
