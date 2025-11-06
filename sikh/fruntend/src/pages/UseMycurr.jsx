import React, { useState } from 'react';
import { toast } from 'react-toastify';

const UseMycurr = ({ address, setAddress, handlePayment }) => {
  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser', {
        position: 'top-right',
        autoClose: 2000,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          const addressData = data.address;

          setAddress((prev) => ({
            ...prev,
            addressLine: addressData.road || prev.addressLine,
            city:
              addressData.city ||
              addressData.town ||
              addressData.village ||
              prev.city,
            state: addressData.state || prev.state,
            pincode: addressData.postcode || prev.pincode,
          }));

          toast.success('Location fetched successfully!', {
            position: 'top-right',
            autoClose: 2000,
          });
        } catch (err) {
          console.error(err);
          toast.error('Failed to fetch location', {
            position: 'top-right',
            autoClose: 2000,
          });
        }
      },
      (err) => {
        console.error(err);
        toast.error('Failed to get current location', {
          position: 'top-right',
          autoClose: 2000,
        });
      }
    );
  };

  // 📥 Handle form input changes
  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  return (
    <div className="border p-6 rounded-lg shadow-md bg-white space-y-4">
      <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>

      <button
        onClick={handleUseLocation}
        className="mb-2 w-full bg-blue-500 text-gray-800 py-2 rounded-xl hover:bg-gray-300 transition"
      >
        Use My Current Location
      </button>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={address.name}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={address.email}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={address.phone}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        name="addressLine"
        placeholder="Address"
        value={address.addressLine}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={address.city}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        name="state"
        placeholder="State"
        value={address.state}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        name="pincode"
        placeholder="Pincode"
        value={address.pincode}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <button
        onClick={handlePayment}
        className="mt-4 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
      >
        Pay with Razorpay
      </button>
    </div>
  );
};

export default UseMycurr;
