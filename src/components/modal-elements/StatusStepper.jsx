import React from 'react';

const StatusStepper = ({ statusItems }) => (
  <div className="border-gray-200 pl-4 pr-2 flex items-start">
    <div className="w-full h-full">
      {statusItems.map((item, index) => {
        // Check if the current step or any step before it is active
        const isCompleted = statusItems.slice(0, index + 1).some((step) => step.active);

        return (
          <div className="flex cursor-pointer rounded" key={index}>
            <div className="flex flex-col items-center mr-3 w-5">
              {/* Top Line */}
              {/* <div
                className={`w-px h-4 ${
                  index === 0 ? 'opacity-0' : isCompleted ? 'bg-green-500' : 'bg-gray-300'
                }`}
              /> */}
              
              {/* Circle/Status Indicator */}
              <div className="flex items-center justify-center w-4 h-4">
                {item.active || isCompleted ? (
                  <div className="flex items-center justify-center w-4 h-4 rounded-full bg-green-500">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-4 h-4 border rounded-full border-gray-300 bg-white"></div>
                )}
              </div>

              {/* Bottom Line */}
              <div
                className={`w-px h-9 ${
                  index === statusItems.length - 1 ? 'opacity-0' : isCompleted ? 'bg-green-500' : 'bg-gray-100'
                }`}
              />
            </div>

            {/* Text */}
            <div className="flex flex-col justify-center mt-[-1rem]">
              <p
                className={`text-xs text-left font-medium mx-4 py-1 px-2 bg-gray-50 rounded-xl ${
                  isCompleted ? 'text-black' : 'text-gray-600'
                }`}
              >
                {item.status}
              </p>
              <p className="text-xs text-left text-gray-400 mx-6">{item.time}</p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default StatusStepper;
