
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
          <img src={product} alt="Product" className="w-8 h-8" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">Pedigree Beef</p>
          <div className="flex justify-between text-xs">
            <span>Qty: 1</span>
            <span>₱ 150</span>
          </div>
        </div>
      </div>
    </div>

    {isProductExpanded && (
      <div className="pb-2">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-white rounded flex items-center justify-center mr-2">
            <img src={product} alt="Product" className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Pedigree Beef</p>
            <div className="flex justify-between text-xs">
              <span>Qty: 1</span>
              <span>₱ 150</span>
            </div>
          </div>
        </div>
      </div>
    )}

    <div className="flex justify-between font-medium mt-2">
      <span>Total</span>
      <span>₱ 300</span>
    </div>
  </div>
);

export default ProductInfo;
