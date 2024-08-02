import React, { useRef, useEffect } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Link ,useNavigate} from 'react-router-dom';
import { useSelector ,useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
const Dashboard = () => {
  const patientsCount = 150;
  const testsCount = 300;
  const reportsGeneratedCount = 120;

  const refPatients = useRef();
  const refTests = useRef();
  const refReports = useRef();
  const { ref: refPatientsObs, inView: inViewPatients } = useInView({ triggerOnce: true });
  const { ref: refTestsObs, inView: inViewTests } = useInView({ triggerOnce: true });
  const { ref: refReportsObs, inView: inViewReports } = useInView({ triggerOnce: true });

  useEffect(() => {
    const setRefs = () => {
      refPatientsObs && refPatientsObs(refPatients.current);
      refTestsObs && refTestsObs(refTests.current);
      refReportsObs && refReportsObs(refReports.current);
    };
    setRefs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refPatientsObs, refTestsObs, refReportsObs]);

 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("auth")
    navigate("/login");
    toast.success('Logged out successfully', {autoClose: 3000});
  };

  const authStatus = useSelector((state) => state.auth);
  const userRole = authStatus.user?.role;

  return (
    <div className="mx-auto  p-8 bg-yellow-100 rounded-md ">
      <h1 className="text-3xl font-semibold text-black mb-4 p-2  uppercase">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`bg-white p-6 rounded-lg shadow-md ${inViewPatients ? 'animate-countup' : ''}`} ref={refPatients}>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Total Patients</h2>
          <p className="text-3xl text-blue-500 font-bold">
            {inViewPatients && <CountUp end={patientsCount} duration={2.5} />}
          </p>
        </div>
        <div className={`bg-white p-6 rounded-lg shadow-md ${inViewTests ? 'animate-countup' : ''}`} ref={refTests}>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Total Tests</h2>
          <p className="text-3xl text-green-500 font-bold">
            {inViewTests && <CountUp end={testsCount} duration={2.5} />}
          </p>
        </div>
        <div className={`bg-white p-6 rounded-lg shadow-md ${inViewReports ? 'animate-countup' : ''}`} ref={refReports}>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Reports Generated</h2>
          <p className="text-3xl text-yellow-500 font-bold">
            {inViewReports && <CountUp end={reportsGeneratedCount} duration={2.5} />}
          </p>
        </div>
        <div className={`bg-white p-6 rounded-lg shadow-md`}>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Reports Pending</h2>
          <p className="text-3xl text-red-500 font-bold">56</p>
        </div>
      </div>
      

      {userRole === 1 && (
        <div className="mt-8 mb-10">
          <h2 className="text-2xl font-semibold text-black mb-4 p-4">Admin Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/create-test" className="block p-4 bg-blue-500 text-white text-center rounded shadow hover:bg-blue-700 transition duration-300">
              Create Test
            </Link>
            <Link to="/all-tests" className="block p-4 bg-green-500 text-white text-center rounded shadow hover:bg-green-700 transition duration-300">
              Manage Tests
            </Link>
            <Link to="/create-patient" className="block p-4 bg-yellow-500 text-white text-center rounded shadow hover:bg-yellow-700 transition duration-300">
              Create Patient
            </Link>
            <Link to="/all-patients" className="block p-4 bg-purple-500 text-white text-center rounded shadow hover:bg-purple-700 transition duration-300">
              Manage Patients
            </Link>
            <Link to="/all-reports" className="block p-4 bg-teal-500 text-white text-center rounded shadow hover:bg-teal-700 transition duration-300">
              All Reports
            </Link>
            <button onClick={handleLogout} className="block p-4 bg-red-500 text-white text-center rounded shadow hover:bg-red-700 transition duration-300">
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
