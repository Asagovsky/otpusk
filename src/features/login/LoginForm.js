import React, { useState } from 'react'
import styles from './login.module.css'

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    return (
        <div>
            <form className={styles.loginForm} onSubmit={e => {
                e.preventDefault();
            }}>
                <input type="email" className={styles.loginInput} value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" className={styles.loginInput} value={password} onChange={e => setPassword(e.target.value)} />
                <input className={styles.loginInput} type="submit" value="Ввійти" />
            </form>
        </div>
    )
}

export default LoginForm
