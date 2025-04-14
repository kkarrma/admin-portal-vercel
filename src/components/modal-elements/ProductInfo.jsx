
import React from 'react';
import product from '../../assets/refund/image14.png';

const ProductInfo = ({ isProductExpanded, setIsProductExpanded }) => (
  <div className="bg-[#EEEEEF] p-3 rounded-md">
    <div 
      className="flex justify-between items-center cursor-pointer"
      onClick={() => setIsProductExpanded(!isProductExpanded)}
    >
      <p className="font-medium">Product Info</p>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={`h-4 w-4 transition-transform ${isProductExpanded ? 'transform rotate-180' : ''}`}
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>

    <div className="py-2 my-2">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-white rounded flex items-center justify-center mr-2">
          <img src={product} alt="Product" className="w-10 h-11" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium font-montserrat text-start">Pedigree Beef</p>
          <div className="flex justify-start text-xs gap-2 text-gray-500">
            <span className='bg-gray-200 rounded-md p-1'>Qty: 1</span>
            <span className='bg-gray-200 rounded-md p-1'>₱ 150</span>
          </div>
        </div>
      </div>
    </div>

    {isProductExpanded && (
      <div className="pb-1 border-b border-gray-300">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-white rounded flex items-center justify-center mr-2">
            <img src={product} alt="Product" className="w-10 h-11" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium font-montserrat text-start">Pedigree Beef</p>
            <div className="flex justify-start text-xs gap-2 text-gray-500">
            <span className='bg-gray-200 rounded-md p-1'>Qty: 1</span>
            <span className='bg-gray-200 rounded-md p-1'>₱ 150</span>
            </div>
          </div>
        </div>
      </div>
    )}

    <div className="flex justify-start pt-2">
      <span className='text-sm font-poppins text-gray-500 pt-1'>Total</span>
      <span className='text-md font-montserrat text-black font-semibold mx-auto'>₱ 300</span>
    </div>
  </div>
);

export default ProductInfo;
