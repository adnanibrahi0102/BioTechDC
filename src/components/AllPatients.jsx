import axios from "axios";
import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AllPatients = () => {
  const [allPatients, setAllPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getAllPatients = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/patients/getAllPatients`);
        setAllPatients(response.data.patients);
        setFilteredPatients(response.data.patients);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getAllPatients();
  }, []);

  useEffect(() => {
    const filteredList = allPatients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredPatients(filteredList);
  }, [searchTerm, allPatients]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (patientId) => {
    try {
      setLoading(true);
      await axiosInstance.delete(`/patients/deletePatient/${patientId}`);
      setAllPatients(
        allPatients.filter((patient) => patient._id !== patientId)
      );
      toast.success("Patient deleted successfully!");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Error deleting patient!");
      setLoading(false);
    }
  };

  const handleGenerateReport = (patientId) => {
    navigate(`/generate-report/${patientId}`);
  };

  const renderTestsDropdown = (tests) => {
    return (
      <div className="mt-2">
        <strong>Tests:</strong>
        <ul className="list-disc list-inside text-gray-600">
          {tests.map((test) => (
            <li key={test._id}>{test.name}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="container mx-auto mt-10 p-4 ">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        All Patients
      </h1>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search by email or name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full max-w-md px-4 py-2 text-lg border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
        />
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <div
              key={patient._id}
              className="bg-white shadow-lg rounded-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Name : {patient.name}
              </h2>
              <p className="text-gray-600 mb-2">
                <strong>Age:</strong> {patient.age}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Gender:</strong> {patient.gender}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Phone:</strong> {patient.phone}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Email:</strong> {patient.email}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Examined By:</strong> {patient.examinedBy}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Amount:</strong> {patient.amount}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Payment Status:</strong>
                {patient.paymentStatus ? (
                  <span className="text-green-500"> Paid</span>
                ) : (
                  <span className="text-red-500"> Not Paid</span>
                )}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Registration Date:</strong>{" "}
                {new Date(patient.createdAt).toLocaleDateString()}
              </p>
              {patient.tests.length > 0 && (
                <div className="mb-4">
                  <details>
                    <summary className="text-blue-500 cursor-pointer">
                      Show Tests
                    </summary>
                    {renderTestsDropdown(patient.tests)}
                  </details>
                </div>
              )}
              <div className="flex space-x-2">
                <button
                  onClick={() => navigate(`/update-patient/${patient._id}`)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(patient._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
                {patient.paymentStatus ? (
                  <button
                    onClick={() => handleGenerateReport(patient._id)}
                    className="bg-green-500 text-white px-3 py-2 rounded-lg shadow hover:bg-green-800 transition duration-300"
                  >
                    Create Report
                  </button>
                ) : (
                  <button
                    className="bg-gray-300 text-gray-600 px-3 py-2 rounded-lg shadow cursor-not-allowed"
                    disabled
                  >
                    Collect Payment
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPatients;
