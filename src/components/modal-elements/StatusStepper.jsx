import React from 'react';
import { GoCheckCircleFill } from "react-icons/go";

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
                  index === 0 ? 'opacity-0' : isCompleted ? 'bg-[#f46f24]' : 'bg-gray-300'
                }`}
              /> */}
              
              {/* Circle/Status Indicator */}
              <div className="flex items-center justify-center w-5 h-5">
                {item.active || isCompleted ? (
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#f46f24]">
                    <GoCheckCircleFill className='w-5 h-5 bg-white text-[#f46f24]' />
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-5 h-5 border rounded-full border-gray-300 bg-white"></div>
                )}
              </div>

              {/* Bottom Line */}
              <div
                className={`w-[1.5px] h-12 ${
                  index === statusItems.length - 1 ? 'opacity-0' : isCompleted ? 'bg-[#f46f24]' : 'bg-gray-100'
                }`}
              />
            </div>

            {/* Text */}
            <div className="flex flex-col justify-center mt-[-2.5rem]">
              <p
                className={`text-sm text-left font-medium mx-4 py-1 px-2 bg-gray-100 rounded-xl ${
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
