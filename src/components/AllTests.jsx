import React, { useState, useEffect } from "react";
import axiosInstance from "../config/axiosInstance";
import { FaTrash, FaPen } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const AllTests = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/tests/getAllTests`, );
        setTests(response.data.test);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tests:", error);
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  const handleDelete = async (testId) => {
    try {
      await axiosInstance.delete(`/tests/deleteTest/${testId}`);
      setTests(tests.filter(test => test._id !== testId)); 
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTests = tests.filter(test => 
    test.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 overflow-x-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">All Tests</h1>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="w-full max-w-md px-4 py-2 text-lg border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <table className="min-w-full bg-white border border-blue-300 shadow-md rounded-lg">
        <thead>
          <tr className="bg-blue-900 text-white">
            <th className="py-3 px-4 border-b border-blue-300 sm:text-sm md:text-base">Name</th>
            <th className="py-3 px-4 border-b border-blue-300 sm:text-sm md:text-base">Description</th>
            <th className="py-3 px-4 border-b border-blue-300 sm:text-sm md:text-base">Price</th>
            <th className="py-3 px-4 border-b border-blue-300 sm:text-sm md:text-base">Normal Range</th>
            <th className="py-3 px-4 border-b border-blue-300 sm:text-sm md:text-base">Abnormal Range</th>
            <th className="py-3 px-4 border-b border-blue-300 sm:text-sm md:text-base">Fasting</th>
            <th className="py-3 px-4 border-b border-blue-300 sm:text-sm md:text-base">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTests.map((test) => (
            <tr key={test._id} className="hover:bg-blue-50">
              <td className="py-3 px-4 border-b border-blue-300 sm:text-sm md:text-base">{test.name}</td>
              <td className="py-3 px-4 border-b border-blue-300 sm:text-sm md:text-base">{test.description}</td>
              <td className="py-3 px-4 border-b border-blue-300 sm:text-sm md:text-base">Rs:{test.price}</td>
              <td className="py-3 px-4 border-b border-blue-300 sm:text-sm md:text-base">{test.normalRange}</td>
              <td className="py-3 px-4 border-b border-blue-300 sm:text-sm md:text-base">{test.abnormalRange}</td>
              <td className="py-3 px-4 border-b border-blue-300 sm:text-sm md:text-base">{test.fasting}</td>
              <td className="py-3 px-4 border-b border-blue-300 sm:text-sm md:text-base">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDelete(test._id)}
                    className="bg-blue-900 hover:bg-blue-600 text-white py-2 px-3 rounded-lg sm:py-2 sm:px-3 md:py-2 md:px-4 transition duration-300"
                  >
                    <FaTrash className="inline-block mr-1" /> Delete
                  </button>
                  <button
                    onClick={() => navigate(`/update-test/${test._id}`)}
                    className="bg-blue-900 hover:bg-blue-600 text-white py-2 px-3 rounded-lg sm:py-2 sm:px-3 md:py-2 md:px-4 transition duration-300"
                  >
                    <FaPen className="inline-block mr-1" /> Update
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllTests;
