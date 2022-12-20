import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logout, selectIsAuth } from '../../redux/slices/auth';

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти')) {
      dispatch(logout());
    }
  };
  return (
    <header>
      <div className="container">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <Link
            to="/"
            className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
            <h4>Главная</h4>
          </Link>

          <div className="col-md-3 text-end">
            {isAuth ? (
              <>
                <Link to="/personalAccount" className="btn btn-outline-primary me-2">
                  Личный кабинет
                </Link>
                <button
                  onClick={onClickLogout}
                  className="btn btn-danger me-2"
                  variant="contained"
                  color="error">
                  Выйти
                </button>
              </>
            ) : (
              <>
                <Link to={'/login'} className="btn btn-outline-primary me-2">
                  Войти
                </Link>
                <Link to={'/register'} className="btn btn-outline-primary me-2">
                  Зарегистрироваться
                </Link>
              </>
            )}
          </div>
        </header>
      </div>
    </header>
  );
};
