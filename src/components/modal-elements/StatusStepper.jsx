import React from 'react';

const StatusStepper = ({ statusItems }) => (
  <div className="border-gray-200 pl-4 pr-2 flex items-start">
    <div className="w-full h-full">
      {statusItems.map((item, index) => (
        <div className="flex cursor-pointer rounded" key={index}>
          <div className="flex flex-col items-center mr-3 w-5">
            <div 
              className={`w-px h-4 ${
                index === 0 ? 'opacity-0' : 
                item.active || (statusItems[index - 1]?.active) ? 'bg-green-500' : 'bg-gray-300'
              }`} 
            />
            <div className="flex items-center justify-center w-5 h-5">
              {item.active ? (
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-500">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </div>
              ) : (
                <div className="flex items-center justify-center w-5 h-5 border rounded-full border-gray-300 bg-white"></div>
              )}
            </div>
            <div 
              className={`w-px h-4 ${
                index === statusItems.length - 1 ? 'opacity-0' : 
                item.active || (statusItems[index + 1]?.active) ? 'bg-green-500' : 'bg-gray-300'
              }`} 
            />
          </div>
          
          <div className="flex flex-col justify-center py-1">
            <p className={`text-sm text-left font-medium ${item.active ? 'text-green-500' : 'text-gray-600'}`}>
              {item.status}
            </p>
            <p className="text-xs text-left text-gray-400">
              {item.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default StatusStepper;