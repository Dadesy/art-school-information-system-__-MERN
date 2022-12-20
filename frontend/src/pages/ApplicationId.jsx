import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import axios from '../axios';
import { fetchUpdateApplication } from '../redux/slices/application';

export const ApplicationId = () => {
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
      <h1>Id заявки {applicationInfo._id}</h1>
      <h3>Имя Пользователя: {applicationInfo.user.userName}</h3>
      <div>
        <h3>
          Статус заявки: {applicationInfo.status.value} ||
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
