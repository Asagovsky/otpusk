import React from 'react';
import LoginForm from './LoginForm';
import styles from './login.module.css';

function Login() {
  return (
    <div>
      <h1 className={styles.header}>Login</h1>
      <LoginForm />
    </div>
  );
}

export default Login;
