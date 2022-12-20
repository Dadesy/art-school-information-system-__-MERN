import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAbiturs,
  fetchTeacher,
  fetchGetSubjects,
  fetchNewGroup,
} from '../../redux/slices/group';

export const AddGroup = () => {
  const dataAbiturs = useSelector((state) => state.group.abiturs);
  const dataTeacher = useSelector((state) => state.group.teacher);
  const dataSubject = useSelector((state) => state.group.subjects);

  const [params, setParams] = React.useState({
    nameGroup: '',
    studentsId: [],
    teacherId: [],
    subject: [],
  });
  console.log(params);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAbiturs());
    dispatch(fetchTeacher());
    dispatch(fetchGetSubjects());
  }, [dispatch]);

  if (!dataAbiturs || !dataTeacher || !dataSubject) {
    return '///';
  }
  return (
    <div>
      <h1>Создание группы</h1>
      <table>
        <tr>
          <td>Название группы</td>
          <td>Ученики</td>
          <td>Класс рук</td>
          <td>Предметы</td>
        </tr>
        <tr>
          <td>
            <input
              value={params.nameGroup}
              onChange={(event) => setParams({ ...params, nameGroup: event.target.value })}
              type="text"
            />
          </td>
          <td>
            <>
              {params.studentsId.map((obj) => (
                <p>{obj}</p>
              ))}

              <select
                name=""
                id=""
                onChange={(event) =>
                  setParams({ ...params, studentsId: [...params.studentsId, event.target.value] })
                }>
                {dataAbiturs.map((obj) => (
                  <>
                    <option key={obj.user._id} value={obj?.user._id}>
                      {obj?.user.userName}
                    </option>
                  </>
                ))}
              </select>
            </>
          </td>
          <td>
            <>
              <p></p>
              <select
                name=""
                id=""
                onChange={(event) => setParams({ ...params, teacherId: event.target.value })}>
                {dataTeacher.map((obj) => (
                  <>
                    <option key={obj._id} value={obj?._id}>
                      {obj?.userName}
                    </option>
                  </>
                ))}
              </select>
            </>
          </td>
          <td>
            <>
              {params.subject.map((obj) => (
                <p>{obj}</p>
              ))}
              <select
                name=""
                id=""
                onChange={(event) =>
                  setParams({ ...params, subject: [...params.subject, event.target.value] })
                }>
                {dataSubject.map((obj) => (
                  <>
                    <option key={obj._id} value={obj?._id}>
                      {obj.name}
                    </option>
                  </>
                ))}
              </select>
            </>
          </td>
        </tr>
      </table>
      <button
        onClick={() => dispatch(fetchNewGroup({ params }))}
        className="btn btn-outline-primary ">
        Добавить
      </button>
    </div>
  );
};
