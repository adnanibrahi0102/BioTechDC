import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import store from './store/store.js';
import { login } from './store/authSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './index.css';
import Layout from './Layout.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import HomePage from './pages/HomePage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import UserProfile from './pages/UserProfile.jsx';
import CreateTestPage from './pages/CreateTestPage.jsx';
import AllTestsPage from './pages/AllTestsPage.jsx';
import UpdateTestPage from './pages/UpdateTestPage.jsx';
import CreatePatientPage from './pages/CreatePatientPage.jsx';
import AllPatientsPage from './pages/AllPatientsPage.jsx';
import GenerateReportPage from './pages/GenerateReportPage.jsx';
import UpdatePatientPage from './pages/UpdatePatientPage.jsx';
import AllReportsPage from './pages/AllReportsPage.jsx';

const AdminGuard = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user && user.role === 1;

  if (!isAdmin) {
    return <LoginPage />;
  }
  return children;
};

const UserGuard = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const isUser = user && user.role === 0;

  if (!isUser) {
    return <LoginPage />;
  }
  return children;
};



const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <HomePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignupPage /> },
      {
        path: '/dashboard',
        element: (
          <AdminGuard>
            <Dashboard />
          </AdminGuard>
        ),
      },
      {
        path:"/create-test",
        element:<AdminGuard>
          <CreateTestPage/>
        </AdminGuard>
      },
      {
        path:"/all-tests",
        element:<AdminGuard>
          <AllTestsPage/>
        </AdminGuard>
      },
      {
        path:"/update-test/:testId",
        element:<AdminGuard>
          <UpdateTestPage/>
        </AdminGuard>
      },
      {
        path:"/create-patient",
        element:<AdminGuard>
          <CreatePatientPage/>
        </AdminGuard>
      },
      {
        path:"/all-patients",
        element:<AdminGuard>
          <AllPatientsPage/>
        </AdminGuard>
      },
      {
        path:"generate-report/:patientId",
        element:<AdminGuard>
          <GenerateReportPage/>
        </AdminGuard>
      },
      {
        path:"/update-patient/:patientId",
        element:<AdminGuard>
          <UpdatePatientPage/>
        </AdminGuard>
      },
      {
        path:"/all-reports",
        element:<AdminGuard>
          <AllReportsPage/>
        </AdminGuard>
      },
      {
        path:"/user",
        element:<UserGuard>
          <UserProfile/>
        </UserGuard>
      }
    ],
  },
]);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const authData = localStorage.getItem('auth');
    if (authData) {
      const parsedAuthData = JSON.parse(authData);
      dispatch(login(parsedAuthData));
    }
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
