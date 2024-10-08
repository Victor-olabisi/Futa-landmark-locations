import React from "react";

const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
      <p className="text-lg mb-6">
        If you have any questions or need further information, please feel free
        to contact us at:
      </p>
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold">Email</h3>
          <p className="text-gray-700">oguntayovictor65@gmail.com</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Phone</h3>
          <p className="text-gray-700">08130887338</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Address</h3>
          <p className="text-gray-700 capitalize">Federal university of technology, Akure</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
