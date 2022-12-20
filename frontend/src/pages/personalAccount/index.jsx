import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { selectIsAuth } from '../../redux/slices/auth';
import {
  fetchAllApplication,
  fetchMyApplication,
  fetchNewApplication,
  fetchRemoveApplication,
} from '../../redux/slices/application';
import styles from './personal.module.scss';
import { fetchGetAllGroup } from '../../redux/slices/group';

export const PersonalAccount = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const dataUser = useSelector((state) => state.auth.data);
  const dataApplication = useSelector((state) => state.application.data);
  const dataGroup = useSelector((state) => state.group.data);

  const { message } = useSelector((state) => state.application);
  if (dataUser) {
  }
  React.useEffect(() => {
    if (dataUser) {
      if (dataUser.roles.includes('USER')) {
        dispatch(fetchMyApplication());
      }

      if (dataUser.roles.includes('ADMIN')) {
        dispatch(fetchAllApplication());
        dispatch(fetchGetAllGroup());
      }
    }
  }, [dispatch, dataUser]);

  React.useEffect(() => {
    if (message) toast(message);
  }, [message]);
  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />;
  }
  if (!dataUser) {
    return <div className="container">...Идет загрузка</div>;
  }
  return (
    <section className={styles.personalAccount}>
      <div className="container">
        <div className={styles.personalAccount__info}>
          <h1>
            Добро пожаловать: <small>{dataUser.userName}</small>
          </h1>
          <h4>
            Вы вошли под ролью: <small>{dataUser.roles}</small>
          </h4>
        </div>
        <>
          {dataUser.roles.includes('ADMIN') ? (
            <div className={styles.adminInformation}>
              <div>
                <Link className="btn btn-outline-primary me-2" to="/addGroup">
                  Сформировать группу
                </Link>
                <Link className="btn btn-outline-primary me-2" to="/addSubject">
                  Добавить предмет группу
                </Link>
                <Link className="btn btn-outline-primary me-2" to="/updateRoles">
                  Управление Ролями
                </Link>
              </div>
              <>
                <h2>Cписок заявок</h2>
                <table>
                  <tbody>
                    <tr>
                      <td> id Заявки</td>
                      <td>Имя пользователя</td>
                      <td>Почта пользователя</td>
                      <td>Статус</td>
                      <td>Функционал</td>
                    </tr>

                    {dataApplication &&
                      dataApplication?.applications.map((obj) => (
                        <tr key={obj._id}>
                          <td>{obj._id}</td>
                          <td>{obj.user.userName}</td>
                          <td>{obj.user.email}</td>
                          <td>{obj.status.value}</td>
                          <td className={styles.tableLink}>
                            <Link to={`/application/${obj._id}`}>Редактировать</Link>
                            <button onClick={() => dispatch(fetchRemoveApplication(obj._id))}>
                              Удалить
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </>
              <h1>Cписок групп</h1>
              <div>
                <>
                  <table>
                    <tbody>
                      <tr>
                        <td>id Группы</td>
                        <td>Название Группы</td>
                        <td>Ученики</td>
                        <td>Список предметов</td>
                        <td>Класс-рук</td>
                        <td>Функционал</td>
                      </tr>

                      {dataGroup &&
                        dataGroup?.map((obj) => (
                          <tr key={''}>
                            {console.log(obj.subject.map((obj) => obj.name))}
                            <td>{obj._id}</td>
                            <td>{obj.name}</td>
                            <td>
                              <b>{obj.students.map((user) => user.userName + ',')}</b>
                            </td>
                            <td>{obj.subject.map((obj) => obj.name)}</td>
                            <td>{obj.teacher.userName}</td>
                            <td className={styles.tableLink}>
                              <Link to={`/application/${obj._id}`}>Редактировать</Link>
                              <button onClick={() => dispatch(fetchRemoveApplication(obj._id))}>
                                Удалить
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </>
              </div>
            </div>
          ) : dataApplication ? (
            <p>Статус вашей заявки: {dataApplication.message}</p>
          ) : dataUser.roles.includes('USER') ? (
            <div className="col-md-5">
              <p>
                Вы можете оставить заявку на Поступление, она будет рассмотренная в ближайшее время.
              </p>
              <button
                onClick={() => dispatch(fetchNewApplication())}
                className="btn btn-outline-primary me-2">
                Оставить заявку на Поступление
              </button>
            </div>
          ) : (
            <h1>Вы не являетесь учеником школы, оставьте заявку на вступление</h1>
          )}
        </>
      </div>
    </section>
  );
};
