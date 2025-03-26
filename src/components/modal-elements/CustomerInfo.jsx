
import React from 'react';

const CustomerInfo = ({ selectedItem }) => (
  <div className="flex flex-col ml-2 pt-6">
    <div className="border-b border-gray-300 justify-items-start py-2">
      <p className="font-medium text-md">{selectedItem.Customer_Name}</p>
      <p className="text-sm text-gray-600">{selectedItem.Date_Purchased}</p>
    </div>
    <div className="py-2">
      <p className="text-sm text-left">
        <span className="font-medium text-gray-500">Phone:</span> (555) 123-4567
      </p>
      <p className="text-sm text-left">
        <span className="font-medium text-gray-500">Address:</span> Brgy. Don Bosco, Parañaque City
      </p>
    </div>
  </div>
);

export default CustomerInfo;
