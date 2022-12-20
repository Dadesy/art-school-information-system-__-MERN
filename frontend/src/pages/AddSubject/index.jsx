import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewSubject, fetchTeacher, fetchGetSubjects } from '../../redux/slices/group';

import styles from './subject.module.scss';

export const AddSubject = () => {
  const dataTeacher = useSelector((state) => state.group.teacher);

  const [params, setParams] = React.useState({
    name: '',
    numberHours: '',
    coastEducation: '',
    teacher: '',
  });

  console.log(params.teacher);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchTeacher());
  }, [dispatch]);
  if (!dataTeacher) {
    return '///';
  }
  return (
    <div className={styles.root}>
      <h1>Создание предмета</h1>
      <div className={''}>
        <h4>Название предмета</h4>
        <input
          type="texr"
          value={params.name}
          onChange={(event) => setParams({ ...params, name: event.target.value })}
          placeholder="......"
        />
      </div>
      <div className={''}>
        <h4>Количество часов</h4>
        <input
          type="texr"
          value={params.numberHours}
          onChange={(event) => setParams({ ...params, numberHours: event.target.value })}
          placeholder="......"
        />
      </div>
      <div className={''}>
        <h4>Стоимость предмета</h4>
        <input
          type="texr"
          value={params.coastEducation}
          onChange={(event) => setParams({ ...params, coastEducation: event.target.value })}
          placeholder="......"
        />
      </div>
      <div className={''}>
        <h4>Выберите руководителя</h4>
        <select
          name=""
          id=""
          onChange={(event) => setParams({ ...params, teacher: event.target.value })}>
          <option disabled>Выберите руководителя</option>
          {dataTeacher.map((obj) => (
            <>
              <option key={obj._id} value={obj?._id}>
                {obj?.userName}
              </option>
            </>
          ))}
        </select>
      </div>
      <button
        onClick={() => dispatch(fetchNewSubject({ params }))}
        className="btn btn-outline-primary ">
        Добавить
      </button>
    </div>
  );
};
