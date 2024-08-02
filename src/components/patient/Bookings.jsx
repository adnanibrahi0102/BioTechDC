import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../config/axiosInstance";
import moment from "moment"; 

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const getAllBookingOfUser = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/bookings/getAll-user-bookings");
        setBookings(response.data.bookings);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getAllBookingOfUser();
  }, []);

  return (
    <div className="container mx-auto p-8 bg-yellow-100 shadow-lg rounded-lg mt-6 ">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">Your Bookings</h1>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="space-y-8">
          {bookings.length === 0 ? (
            <p className="text-center text-black">No bookings found</p>
          ) : (
            bookings.map((booking) => (
              <div key={booking._id} className="bg-yellow-50 p-6 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-900">Address: {booking.address}</p>
                    <p className="text-sm text-gray-900">Age: {booking.age}</p>
                    <p className="text-sm text-gray-900">Gender: {booking.gender}</p>
                    <p className="text-sm text-gray-900">Examined By: {booking.examinedBy}</p>
                    <p className="text-sm text-gray-900">Amount: Rs{booking.amount}</p>
                    <p className="text-sm text-gray-900">Payment Status: {booking.paymentStatus ? 'Paid' : 'Pending'}</p>
                    <p className="text-sm text-gray-900">Booking Date: {moment(booking.createdAt).format("MMMM Do YYYY, h:mm a")}</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-950">Tests:</p>
                    <ul className="list-disc pl-4">
                      {booking.tests.map((test) => (
                        <li key={test._id}>
                          {test.name} - Rs{test.price}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-lg font-bold text-gray-950">User Details:</p>
                  <p className="text-sm">Email: {user.email}</p>
                  <p className="text-sm">Name: {user.name}</p>
                  <p className="text-sm text-red-600">Please visit the lab to give your sample.</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Bookings;
