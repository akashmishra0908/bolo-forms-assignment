import React from 'react';

const CategorizeInput = ({ onChange }) => {
  return <input type="text" onChange={(e) => onChange(e.target.value)} />;
};

export default CategorizeInput;
