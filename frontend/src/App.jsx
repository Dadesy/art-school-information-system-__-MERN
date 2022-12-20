import React from 'react';

import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch } from 'react-redux';
import { fetchAuthMe } from './redux/slices/auth';

import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { PersonalAccount } from './pages/personalAccount';
import { ApplicationId } from './pages/ApplicationId';
import { AddGroup } from './pages/AddGroup';
import { AddSubject } from './pages/AddSubject';
import { UpdateRoles } from './pages/UpdateRoles';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="personalAccount" element={<PersonalAccount />} />
        <Route path="application/:id" element={<ApplicationId />} />
        <Route path="AddGroup" element={<AddGroup />} />
        <Route path="AddSubject" element={<AddSubject />} />
        <Route path="updateRoles" element={<UpdateRoles />} />
        <Route path="*" element={<h2>Ресурс не найден</h2>} />
      </Routes>

      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;
