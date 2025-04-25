import React from 'react';

const UserInfo = ({ selectedUser }) => (
  <div className="flex flex-col ml-2 pt-6">
    <div className="border-b border-gray-300 justify-items-start py-2 font-montserrat">
      <p className="font-medium text-md">{selectedUser.First_Name} {selectedUser.Last_Name}</p>
      <p className="text-sm text-gray-600 font-medium">{selectedUser.Email}</p>
    </div>
  </div>
);

export default UserInfo;