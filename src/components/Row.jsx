import React, { useState } from "react";

const Row = ({ row, updateRow }) => {
  const [inputValue, setInputValue] = useState("");

  // Function to handle the allocation percentage change
  const handleAllocationPercentage = () => {
    const percentage = parseFloat(inputValue);
    if (!isNaN(percentage)) {
      updateRow(row.id, percentage, true);
    }
  };

  // Function to handle the allocation value change
  const handleAllocationValue = () => {
    const value = parseFloat(inputValue);
    if (!isNaN(value)) {
      updateRow(row.id, value, false);
    }
  };

  const formatVariance = (variance) => {
    if (variance % 1 === 0) {
      return variance.toFixed(0); // No decimals
    }
    return variance.toFixed(2); // Two decimal places
  }

  return (
    <>
      <tr>
        <td>{row.label}</td>
        <td>{row.value}</td>
        <td>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </td>
        <td>
          <button onClick={handleAllocationPercentage}>[button 1]</button>
        </td>
        <td>
          <button onClick={handleAllocationValue}>[button 2]</button>
        </td>
        <td>{row.variance || "0"}%</td>
      </tr>

      {/* Render children and prepend '--' to their label */}
      {row.children &&
        row.children.map((child) => (
          <Row key={child.id} row={{ ...child, label: `--${child.label}` }} updateRow={updateRow} />
        ))}
    </>
  );
};

export default Row;
