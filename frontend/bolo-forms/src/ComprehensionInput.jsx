import React from 'react';

const ComprehensionInput = ({ onChange }) => {
  return <textarea onChange={(e) => onChange(e.target.value)} />;
};

export default ComprehensionInput;
