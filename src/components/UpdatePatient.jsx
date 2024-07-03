import React, { useEffect, useState } from "react";
import axiosInstance from '../config/axiosInstance'
import { useNavigate, useParams } from "react-router-dom";
import {toast} from 'react-toastify';

const UpdatePatient = () => {
  const { patientId } = useParams();
  const navigate = useNavigate()
  const [patientData, setPatientData] = useState({
    phone: "",
    tests: [],
    amount: "",
    paymentStatus: "",
  });

  const [dbTests, setDbTests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPatientDetails = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `/patients/getPatient/${patientId}`,
        );
        const { phone, tests, amount, paymentStatus } = response.data.patient;
        setPatientData({
          phone,
          tests,
          amount: amount.toString(),
          paymentStatus: paymentStatus.toString(),
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching patient details:", error);
        setLoading(false);
      }
    };

    const getAllTests = async () => {
      try {
        const response = await axiosInstance.get(
          `/tests/getAllTests`,
        );
        setDbTests(response.data.test);
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };

    getPatientDetails();
    getAllTests();
  }, [patientId]);

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

  const handleUpdatePatient = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axiosInstance.patch(
        `/patients/updatePatient/${patientId}`,
        {
          phone: patientData.phone,
          tests: patientData.tests,
          amount: parseFloat(patientData.amount),
          paymentStatus: patientData.paymentStatus === "true",
        }
      );
      setLoading(false);
      toast.success("Patient updated successfully!");
      setPatientData({
        phone: "",
        tests: [],
        amount: "",
        paymentStatus: "",
      })
      navigate("/all-patients");
    } catch (error) {
      console.error("Error updating patient:", error);
      toast.error("Error updating patient. Please try again!");      
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Update Patient
      </h2>
      <form onSubmit={handleUpdatePatient}>
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter patient phone number"
            value={patientData.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">
            Select Tests
          </label>
          <select
            name="tests"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={""}
            onChange={handleTestsSelection}
          >
            <option value="" disabled>
              Select test(s)
            </option>
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
          <label className="block text-gray-700 font-semibold mb-2">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter amount"
            value={patientData.amount}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2">
            Payment Status
          </label>
          <select
            name="paymentStatus"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
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
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdatePatient;
