import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginUser } from './loginSlice';
import styles from './login.module.css';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Будь ласка, введіть валідний Email')
    .required("Це поле обов'язкове"),
  password: Yup.string()
    .min(3, 'Пароль занадто короткий')
    .required("Це поле обов'язкове"),
});

function LoginForm() {
  const error = useSelector(state => state.auth.error);
  const message = useSelector(state => state.auth.message);
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (token) {
      history.push('/');
    }
  }, [token]);

  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        enableReinitialize
        validationSchema={LoginSchema}
        onSubmit={user => {
          dispatch(loginUser(user));
        }}
      >
        {({ errors, touched }) => (
          <Form label="email" className={styles.loginForm}>
            <Field name="email" className={styles.loginInput} />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <Field
              name="password"
              type="password"
              className={styles.loginInput}
            />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <button className={styles.loginInput} type="submit">
              Ввійти
            </button>
            {error && <div>{message}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
