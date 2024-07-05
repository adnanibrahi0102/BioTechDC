import React, { useRef, useEffect } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

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

  return (
    <div className="container mx-auto px-4 mt-8 h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">Dashboard</h1>
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
    </div>
  );
};

export default Dashboard;
