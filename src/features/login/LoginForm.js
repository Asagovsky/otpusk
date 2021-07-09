import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import * as queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
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

const LoginForm = withRouter(({ location }) => {
  const error = useSelector(state => state.auth.error);
  const message = useSelector(state => state.auth.message);
  const loggedIn = useSelector(state => state.auth.loggedIn);
  const dispatch = useDispatch();
  const history = useHistory();
  const params = queryString.parse(location.search);

  useEffect(() => {
    if (loggedIn) {
      history.push(params.redirect || '/');
    }
  }, [loggedIn]);

  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          password: '',
          rememberMe: false,
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
            <label htmlFor="rememberMe">
              <Field name="rememberMe" id="rememberMe" type="checkbox" />
              Запам&apos;ятати мене
            </label>

            <button className={styles.loginInput} type="submit">
              Ввійти
            </button>
            {error && <div>{message}</div>}
          </Form>
        )}
      </Formik>
      {params.redirect && (
        <div className={styles.header}>
          Для доступу до даних вам потрібно виконати вхід в аккаунт
        </div>
      )}
    </div>
  );
});

export default LoginForm;
