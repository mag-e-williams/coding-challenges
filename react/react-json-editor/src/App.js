import React, { useState, useEffect } from 'react';
import './App.css';
import 'h8k-components';

const formatValue = (s) => {
  if (typeof s === 'string') {
    return `"${s}"`;
  } else 
  return s;
};

const CollapseButton = ({ isOpen, onClick }) => {
  const openChar = '▼';
  const closedChar = '▶';

  return (
    <p style={{ cursor: 'pointer' }} onClick={onClick}>
      {isOpen ? openChar : closedChar}
    </p>
  );
};

const JSONText = ({ jsonBlob }) => {
  const elements = Object.entries(jsonBlob)
  return (
    <div className="jsonText">
      {elements.map(([key, value]) => {
        return (
          <div className='row'>
            <p>{`"${key}":`}</p>
            { (typeof value === 'object') ? 
              <JSONBlobObject jsonBlob={value}/> : 
              <p>{`${formatValue(value)}`}</p>
            }          
          </div>
        );
      })}
    </div>
  );
};

const JSONBlobObject = ({ jsonBlob }) => {
  const [isOpen, setOpen] = useState(false);
  console.log(jsonBlob);
  return (
    <>
      <CollapseButton isOpen={isOpen} onClick={() => setOpen(!isOpen)} className="collapseButton"/>
      {isOpen ? (
        <>
          <p>{`{`}</p>
          <JSONText jsonBlob={jsonBlob}/>
          <p>{`}`}</p>
        </>
      ) : 
        (<p>{`{ ... }`}</p>)
      }
    </>
  );
};

export default function App({ jsonObject }) {
  return (
    <JSONBlobObject jsonBlob={jsonObject} />
  );
}
