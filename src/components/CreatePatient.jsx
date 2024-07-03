import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config/baseUrl";
import {toast} from 'react-toastify'

const CreatePatient = () => {
  const [patientData, setPatientData] = useState({
    name: "",
    age: "",
    gender: "",
    address: "",
    phone: "",
    email: "",
    examinedBy: "",
    amount: "",
    paymentStatus: "",
    tests: [],
  });

  const [dbTests, setDbTests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllTests = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${BASE_URL}/api/v1/tests/getAllTests`,
          { withCredentials: true }
        );
        setDbTests(response.data.test);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tests:", error);
        setLoading(false);
      }
    };

    getAllTests();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTestsSelection = (e) => {
    const selectedValue = e.target.value;
    setPatientData((prevData) => {
      const newTests = [...prevData.tests];
      if (newTests.includes(selectedValue)) {
        newTests.splice(newTests.indexOf(selectedValue), 1);
      } else {
        newTests.push(selectedValue);
      }
      return { ...prevData, tests: newTests };
    });
  };

  const handlePatientCreation = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${BASE_URL}/api/v1/patients/createPatient`,
        {
          ...patientData,
          age: parseInt(patientData.age), 
          amount: parseFloat(patientData.amount), 
          paymentStatus: patientData.paymentStatus === "true", 
        },
        { withCredentials: true }
      );
      
      setPatientData({
        name: "",
        age: "",
        gender: "",
        address: "",
        phone: "",
        email: "",
        examinedBy: "",
        amount: "",
        paymentStatus: "",
        tests: [],
      });
      setLoading(false);
      toast.success("Patient created successfully!");
    } catch (error) {
      toast.error("Error creating patient. Please try again.");
      console.error("Error creating patient:", error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Create Patient
      </h2>
      <form onSubmit={handlePatientCreation}>
        {/* Form inputs */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Name</label>
          <input
            type="text"
            name="name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter patient name"
            required
            value={patientData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Age</label>
          <input
            type="number"
            name="age"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter patient age"
            required
            value={patientData.age}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Select Tests</label>
          <select
            name="tests"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={""} 
            onChange={handleTestsSelection}
          >
            <option value="" disabled>Select test(s)</option>
            {dbTests.map((test) => (
              <option key={test._id} value={test._id}>
                {test.name}
              </option>
            ))}
          </select>
          <div className="mt-2">
            {patientData.tests.map((testId) => {
              const test = dbTests.find((t) => t._id === testId);
              return test ? (
                <div key={testId} className="bg-blue-100 p-1 rounded">
                  {test.name}
                </div>
              ) : null;
            })}
          </div>
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Gender</label>
          <input
            type="text"
            name="gender"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter patient gender"
            required
            value={patientData.gender}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Address</label>
          <input
            type="text"
            name="address"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter patient address"
            required
            value={patientData.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Phone</label>
          <input
            type="text"
            name="phone"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter patient phone number"
            required
            value={patientData.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter patient email address"
            required
            value={patientData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Examined By</label>
          <input
            type="text"
            name="examinedBy"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter examiner name"
            required
            value={patientData.examinedBy}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Amount</label>
          <input
            type="number"
            name="amount"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter amount"
            required
            value={patientData.amount}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">Payment Status</label>
          <select
            name="paymentStatus"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
            value={patientData.paymentStatus}
            onChange={handleInputChange}
          >
            <option value="">Select payment status</option>
            <option value="true">Paid</option>
            <option value="false">Not Paid</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          {
            loading? "Creating..." : "Create Patient"
          }
        </button>
      </form>
    </div>
  );
};

export default CreatePatient;
