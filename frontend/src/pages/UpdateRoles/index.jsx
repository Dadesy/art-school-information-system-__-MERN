import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewSubject, fetchTeacher, fetchGetSubjects } from '../../redux/slices/group';

import styles from './subject.module.scss';

export const UpdateRoles = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const [applicationInfo, setInfo] = React.useState(null);
  const [status, setStatus] = React.useState(null);
  const [applicationStatus, setApplicationStatus] = React.useState(null);

  React.useEffect(() => {
    const getApplication = async () => {
      const { data } = await axios.get(`/application/get/${id}`);
      setInfo(data.application);
    };
    const getStatusApplication = async () => {
      const { data } = await axios.get(`/application/getStatus`);

      setStatus(data.status);
    };

    getApplication();
    getStatusApplication();
  }, [id]);

  if (!applicationInfo || !status) {
    return 'Загрузка...';
  }
  return (
    <div className="container">
      <h3>Имя Пользователя: {applicationInfo.user.userName}</h3>
      <div>
        <h3>
          Роль: {applicationInfo.status.value} ||
          <select onChange={(event) => setApplicationStatus(event.target.value)}>
            {status.map((obj) => (
              <option key={obj._id} value={obj._id}>
                {obj.value}
              </option>
            ))}
          </select>
        </h3>
      </div>
      <button
        className="btn btn-outline-primary me-2"
        onClick={() => dispatch(fetchUpdateApplication({ id, applicationStatus }))}>
        Изменить
      </button>
    </div>
  );
};
