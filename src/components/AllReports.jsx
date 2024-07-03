import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../config/axiosInstance';
import {toast} from 'react-toastify';

const AllReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllReports = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/reports/getAllReports');
        setReports(response.data.reports);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reports:", error);
        setLoading(false);
      }
    };
    getAllReports();
  }, []);

  const generateAndSendReport = async (reportId) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(`/reports/generate-report/${reportId}`);
      setLoading(false);
      toast.success("Report generated and sent successfully!");
      console.log("Report sent:", response);
    } catch (error) {
      console.error("Error generating or sending report:", error);
      setLoading(false);
      toast.error("Error generating or sending report!");
    }
  };

  const handleDeleteReport = async(reportId)=>{
    try {
      setLoading(true);
      await axiosInstance.delete(`/reports/delete-report/${reportId}`);
      setReports(reports.filter(report=>report._id!==reportId));
      setLoading(false);
      toast.success("Report deleted successfully!");
    } catch (error) {
      console.error("Error deleting report:", error);
      setLoading(false);
      toast.error("Error deleting report!");
      
    }
  }


  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
        All Reports
      </h1>

      {reports.map((report, reportIndex) => (
        <div
          key={reportIndex}
          className="bg-white p-6 mb-8 rounded-lg shadow-md border border-gray-300"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Patient Details
          </h2>
          <div className="bg-blue-100 p-4 rounded-md mb-4">
            <p>
              <strong>Name:</strong> {report.patient.name}
            </p>
            <p>
              <strong>Age:</strong> {report.patient.age}
            </p>
            <p>
              <strong>Gender:</strong> {report.patient.gender}
            </p>
            <p>
              <strong>Address:</strong> {report.patient.address}
            </p>
            <p>
              <strong>Examined By:</strong> {report.patient.examinedBy}
            </p>
            <p>
              <strong>Email:</strong> {report.patient.email}
            </p>
            <p>
              <strong>Phone:</strong> {report.patient.phone}
            </p>
            <p>
              <strong>Payment Status:</strong>{" "}
              {report.patient.paymentStatus ? "Paid" : "Pending"}
            </p>
            <p>
              <strong>Registered At:</strong>{" "}
              {new Date(report.patient.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex justify-center mb-6 gap-4">
            <button
              onClick={() => generateAndSendReport(report._id)}
              className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
            >
              {loading ? "Generating Report..." : "Send And Generate Report"}

            </button>

            <button
            onClick={()=>handleDeleteReport(report._id)} 
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75">
              Delete
            </button>
          </div>

          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Test Reports
          </h3>
          {report.reports.map((testReport, index) => (
            <div
              key={index}
              className="bg-green-100 p-4 rounded-md mb-4 border border-gray-300"
            >
              <p>
                <strong>Test Name:</strong> {testReport.tests[0].name}
              </p>
              <p>
                <strong>Normal Range:</strong> {testReport.tests[0].normalRange}
              </p>
              <p>
                <strong>Abnormal Range:</strong>{" "}
                {testReport.tests[0].abnormalRange}
              </p>
              <p>
                <strong>Result:</strong> {testReport.result}
              </p>
              <p>
                <strong>Units:</strong> {testReport.unit}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`font-bold ${
                    report.status === "approved"
                      ? "text-green-700"
                      : report.status === "denied"
                      ? "text-red-700"
                      : "text-yellow-700"
                  }`}
                >
                  {report.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      ))}
      <div className="flex justify-center space-x-4"></div>
    </div>
  );
};

export default AllReports;
