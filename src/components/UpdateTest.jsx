import React, { useState, useEffect } from "react";
import axiosInstance from '../config/axiosInstance'
import { useNavigate } from "react-router-dom";
import TestFormComponent from "./TestFormComponent";
import { useParams } from "react-router-dom";
import {toast} from 'react-toastify';

const UpdateTest = () => {
  const navigate = useNavigate();
  const {testId} = useParams()
  const [testData, setTestData] = useState({
    name: "",
    description: "",
    price: "",
    normalRange: "",
    abnormalRange: "",
    fasting: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/tests/getTest/${testId}`);
        setTestData(response.data.test);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    if (testId) {
      fetchTestData();
    }
  }, [testId]);

  const handleTestUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axiosInstance.patch(`/tests/updateTest/${testId}`, testData);
      setLoading(false);
      toast.success("Test updated successfully")
      navigate("/all-tests");
    } catch (error) {
      setLoading(false);
      toast.error("Failed to update test")
      console.log(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Update Test</h2>
      <TestFormComponent
        testData={testData}
        setTestData={setTestData}
        handleSubmit={handleTestUpdate}
        loading={loading}
      />
    </div>
  );
};

export default UpdateTest;
