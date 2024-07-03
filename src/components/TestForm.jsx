import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../config/baseUrl";
import { Link } from "react-router-dom";
import TestFormComponent from "./TestFormComponent";
import {toast} from 'react-toastify';

const TestForm = () => {
  const [testData, setTestData] = useState({
    name: "",
    description: "",
    price: "",
    normalRange: "",
    abnormalRange: "",
    fasting: "",
  });
  const [loading, setLoading] = useState(false);

  const handleTestSubmission = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${BASE_URL}/api/v1/tests/createTest`,
        testData,
        { withCredentials: true }
      );
      setLoading(false);
      toast.success('Test created successfully!')
      setTestData({
        name: "",
        description: "",
        price: "",
        normalRange: "",
        abnormalRange: "",
        fasting: "",
      });
    } catch (error) {
      setLoading(false);
      toast.error('Error while creating test!')
      console.log(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-md rounded-lg p-6 ">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Create Test
      </h2>
      <TestFormComponent
       testData={testData}
       setTestData={setTestData}
       handleSubmit={handleTestSubmission}
       loading={loading}
      />
    </div>
  );
};

export default TestForm;
