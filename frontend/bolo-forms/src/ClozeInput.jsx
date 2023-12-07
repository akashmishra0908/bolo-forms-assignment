import React from 'react';

const ClozeInput = ({ onChange }) => {
  return <input type="text" onChange={(e) => onChange(e.target.value)} />;
};

export default ClozeInput;
