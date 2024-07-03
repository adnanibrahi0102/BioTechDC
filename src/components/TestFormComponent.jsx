import React from "react";

const TestFormComponent = ({ testData, setTestData, handleSubmit, loading }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5">
        <label className="block text-gray-700 font-semibold mb-2">Name</label>
        <input
          type="text"
          name="name"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Enter test name"
          required
          value={testData.name}
          onChange={(e) => setTestData({ ...testData, name: e.target.value })}
        />
      </div>
      <div className="mb-5">
        <label className="block text-gray-700 font-semibold mb-2">Description</label>
        <textarea
          name="description"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Enter test description"
          required
          value={testData.description}
          onChange={(e) => setTestData({ ...testData, description: e.target.value })}
        ></textarea>
      </div>
      <div className="mb-5">
        <label className="block text-gray-700 font-semibold mb-2">Price</label>
        <input
          type="text"
          name="price"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Enter test price"
          required
          value={testData.price}
          onChange={(e) => setTestData({ ...testData, price: e.target.value })}
        />
      </div>
      <div className="mb-5">
        <label className="block text-gray-700 font-semibold mb-2">Normal Range</label>
        <input
          type="text"
          name="normalRange"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Enter normal range"
          required
          value={testData.normalRange}
          onChange={(e) => setTestData({ ...testData, normalRange: e.target.value })}
        />
      </div>
      <div className="mb-5">
        <label className="block text-gray-700 font-semibold mb-2">Abnormal Range</label>
        <input
          type="text"
          name="abnormalRange"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Enter abnormal range"
          required
          value={testData.abnormalRange}
          onChange={(e) => setTestData({ ...testData, abnormalRange: e.target.value })}
        />
      </div>
      <div className="mb-5">
        <label className="block text-gray-700 font-semibold mb-2">Fasting</label>
        <input
          type="text"
          name="fasting"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Enter fasting requirement"
          required
          value={testData.fasting}
          onChange={(e) => setTestData({ ...testData, fasting: e.target.value })}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        {loading ? "Loading..." : "Create Test"}
      </button>
    </form>
  );
};

export default TestFormComponent;
