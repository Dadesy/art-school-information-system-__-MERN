import React from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDataRegister, selectIsAuth } from '../../redux/slices/auth';
import { Navigate } from 'react-router-dom';

import styles from './login.module.scss';

export const Register = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.auth);

  const isAuth = useSelector(selectIsAuth);
  console.log(isAuth);

  const [dataUser, setDataUser] = React.useState({
    email: '',
    userName: '',
    password: '',
    birthDate: '',
  });

  const onSubmit = () => {
    dispatch(fetchUserDataRegister({ dataUser }));
    setDataUser({ email: '', userName: '', password: '', birthDate: '' });
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
        <h1>Регистрация</h1>

        <div className={styles.root__body}>
          <div>
            <div className={styles.input}>
              <p>Фио</p>
              <input
                type="text"
                value={dataUser.userName}
                onChange={(event) => setDataUser({ ...dataUser, userName: event.target.value })}
                placeholder="Иванов Иван Иванович"
              />
            </div>
            <div className={styles.input}>
              <p>Email-адрес</p>
              <input
                value={dataUser.email}
                onChange={(event) => setDataUser({ ...dataUser, email: event.target.value })}
                type="email"
                placeholder="name@example.com"
              />
            </div>
          </div>
          <div>
            <div className={styles.input}>
              <p>Дата рождения</p>
              <input
                type="date"
                value={dataUser.birthDate}
                onChange={(event) => setDataUser({ ...dataUser, birthDate: event.target.value })}
                placeholder="01-01-2000"
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
          </div>
        </div>

        <button className="col-md-8" onClick={onSubmit}>
          Зарегистрироваться
        </button>
      </div>
    </section>
  );
};
