import axiosInstance from '../config/axiosInstance';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../config/baseUrl';

const GenerateReport = () => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState([{ result: '', unit: '', testIds: [] }]);
  const navigate = useNavigate();

  useEffect(() => {
    const getPatient = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/patients/getPatient/${patientId}`);
        setPatient(response.data.patient);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching patient:", error);
        setLoading(false);
      }
    };
    getPatient();
  }, [patientId]);

  const handleAddReport = () => {
    setReports([...reports, { result: '', unit: '', testIds: [] }]);
  };

  const handleRemoveReport = (index) => {
    const updatedReports = [...reports];
    updatedReports.splice(index, 1);
    setReports(updatedReports);
  };

  const handleResultChange = (index, value) => {
    const updatedReports = [...reports];
    updatedReports[index].result = value;
    setReports(updatedReports);
  };

  const handleUnitChange = (index, value) => {
    const updatedReports = [...reports];
    updatedReports[index].unit = value;
    setReports(updatedReports);
  };

  const handleTestIdsChange = (index, selectedIds) => {
    const updatedReports = [...reports];
    updatedReports[index].testIds = selectedIds;
    setReports(updatedReports);
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post(`/reports/create-report/${patientId}`, { reports });
      navigate('/all-reports');
    } catch (error) {
      console.error("Error creating report:", error);
      alert("Error creating report");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">Biotech DC - Generate Report</h1>
      {patient && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Patient Details</h2>
          <p><strong>Name:</strong> {patient.name}</p>
          <p><strong>Age:</strong> {patient.age}</p>
          <p><strong>Email:</strong> {patient.email}</p>
          <p><strong>Phone:</strong> {patient.phone}</p>
          {/* Additional patient details can be displayed here */}

          {reports.map((report, index) => (
            <div key={index} className="mt-6 border p-4 rounded-md shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Report {index + 1}</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Result:</label>
                <input
                  type="text"
                  value={report.result}
                  onChange={(e) => handleResultChange(index, e.target.value)}
                  className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Unit:</label>
                <input
                  type="text"
                  value={report.unit}
                  onChange={(e) => handleUnitChange(index, e.target.value)}
                  className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Select Tests:</label>
                <select
                  multiple
                  value={report.testIds}
                  onChange={(e) => handleTestIdsChange(index, Array.from(e.target.selectedOptions, option => option.value))}
                  className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border rounded-md p-2"
                >
                  {patient.tests.map(test => (
                    <option key={test._id} value={test._id}>{test.name}</option>
                  ))}
                </select>
              </div>
              {index > 0 && (
                <button
                  onClick={() => handleRemoveReport(index)}
                  className="text-red-600 hover:text-red-800 text-sm focus:outline-none"
                >
                  Remove Report
                </button>
              )}
            </div>
          ))}

          <button
            onClick={handleAddReport}
            className="mt-6 mr-4 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
          >
            Add Report
          </button>

          <button
            onClick={handleSubmit}
            className="mt-6 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
          >
            Create Report
          </button>
        </div>
      )}
    </div>
  );
};

export default GenerateReport;
