
import React from 'react';
import sample1 from '../../assets/refund/image15.png';
import sample2 from '../../assets/refund/image16.png';
import sample3 from '../../assets/refund/image17.png';
import sample4 from '../../assets/refund/image18.png';

const ProofImages = () => (
  <div className="mt-3 mb-2 w-full">
    <p className="block text-sm font-medium mb-1 text-left pl-2">Proof of Return Item</p>
    <div className="flex gap-2 overflow-x-auto pb-2 justify-between">
      <img src={sample1} alt="Return proof" className="w-28 h-20 object-cover rounded-md" />
      <img src={sample2} alt="Return proof" className="w-28 h-20 object-cover rounded-md" />
      <img src={sample3} alt="Return proof" className="w-28 h-20 object-cover rounded-md" />
      <img src={sample4} alt="Return proof" className="w-28 h-20 object-cover rounded-md" />
    </div>
  </div>
);

export default ProofImages;
