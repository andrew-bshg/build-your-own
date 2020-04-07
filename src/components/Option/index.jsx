import React from "react";

const Option = ({ value, label, name , clicked, disabled}) => {
  return (
    <div>
      <input type="radio" value={value} name={name} onClick={clicked} disabled={disabled}/>
      <label>{label} ID: {value}</label>
      {/* <p>ID: {value}</p> */}
    </div>
  );
};

export default Option;
