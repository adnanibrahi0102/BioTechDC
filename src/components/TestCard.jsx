import React from 'react';
import { FaInfoCircle, FaClipboard, FaFlask } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
const TestCard = ({ test }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/book-test`);
    toast.warning("Please SignUp or Login to Book Test");
    
  };
  return (
    <div className="max-w-xs overflow-hidden shadow-lg bg-white m-4 border border-gray-200 rounded-md p-4 sm:p-6">
      <div className="px-2 py-4">
        <div className="font-semibold text-base mb-2 text-gray-900">{test.name}</div>
        <hr className='border-black border-b-3' />
        <div className="flex items-center text-blue-600 mb-2">
          <FaInfoCircle className="mr-2" />
          <p className="text-gray-700 text-sm">{test.preparation}</p>
        </div>
        <div className="flex items-center text-blue-600 mb-2">
          <FaClipboard className="mr-2" />
          <p className="text-gray-700 text-base">{test.schedule}</p>
        </div>
        <div className="flex items-center text-blue-600 mb-2">
          <FaFlask className="mr-2" />
          <p className="text-gray-700 text-base">{test.parameters} parameter(s) covered</p>
        </div>
      </div>
      <div className="flex justify-between items-center px-4 py-3 bg-yellow-400">
        <p className="text-gray-900 font-bold text-xl">₹{test.price}</p>
        <button onClick={handleNavigate} className="bg-blue-600 text-white font-bold py-2 px-2 rounded hover:bg-blue-700">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default TestCard;
