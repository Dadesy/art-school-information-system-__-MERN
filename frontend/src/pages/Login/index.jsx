import React from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDataLogin, selectIsAuth } from '../../redux/slices/auth';
import { Navigate } from 'react-router-dom';
import styles from './login.module.scss';

export const Login = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.auth);

  const isAuth = useSelector(selectIsAuth);

  const [dataUser, setDataUser] = React.useState({
    email: '',
    password: '',
  });

  const onSubmit = () => {
    dispatch(fetchUserDataLogin({ dataUser }));
  };

  React.useEffect(() => {
    if (message) toast(message);
  }, [message, isAuth]);

  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <h1>Авторизация</h1>

        <div className={styles.input}>
          <p>Email-адрес</p>
          <input
            type="email"
            value={dataUser.email}
            onChange={(event) => setDataUser({ ...dataUser, email: event.target.value })}
            placeholder="name@example.com"
          />
        </div>
        <div>
          <p>Пароль</p>
          <input
            type="password"
            value={dataUser.password}
            onChange={(event) => setDataUser({ ...dataUser, password: event.target.value })}
            placeholder="Password"
          />
        </div>

        <button className="col-md-8" onClick={onSubmit}>
          Войти
        </button>
      </div>
    </section>
  );
};
