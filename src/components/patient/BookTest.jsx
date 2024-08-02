import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "react-toastify";

const BookTest = () => {
  const [tests, setAllTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    address: "",
    examinedBy: "",
    amount: "0",
    paymentStatus: false,
    tests: [],
  });

  useEffect(() => {
    const getAllTests = async () => {
      try {
        const response = await axiosInstance.get("/tests/getAllTests");
        setAllTests(response.data.test);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tests:", error);
        setLoading(false);
      }
    };
    getAllTests();
  }, []);

  const handleTestChange = (testId, price) => {
    setFormData((prevState) => {
      let newTests;
      let newAmount;
      if (prevState.tests.includes(testId)) {
        newTests = prevState.tests.filter((id) => id !== testId);
        newAmount = parseFloat(prevState.amount) - parseFloat(price);
      } else {
        newTests = [...prevState.tests, testId];
        newAmount = parseFloat(prevState.amount) + parseFloat(price);
      }
      return {
        ...prevState,
        tests: newTests,
        amount: newAmount.toFixed(2).toString(),
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        `/bookings/create-booking`,
        {
          ...formData,
          age: parseInt(formData.age),
          amount: parseFloat(formData.amount),
        },
      );
      console.log(response);
      toast.success("Test Booked Successfully");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed to Book Test");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 bg-yellow-100 shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">Book Your Test</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Select Tests
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tests.map((test) => (
              <div
                key={test._id}
                className="bg-white shadow-md rounded-lg overflow-hidden p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-200"
              >
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="tests"
                    onChange={() => handleTestChange(test._id, test.price)}
                    value={test._id}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">{test.name}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Examined By
          </label>
          <input
            type="text"
            name="examinedBy"
            value={formData.examinedBy}
            onChange={(e) => setFormData({ ...formData, examinedBy: e.target.value })}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            readOnly
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-600 text-black py-3 px-4 rounded-md shadow-md hover:bg-yellow-200 transition-colors duration-200 font-bold"
          disabled={loading}
        >
          {loading ? "Loading..." : "Book Your Test"}
        </button>
      </form>
    </div>
  );
};

export default BookTest;
