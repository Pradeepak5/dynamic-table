import React, { useState } from "react";
import Row from "./Row";

const Table = ({ data }) => {
  const [rows, setRows] = useState(data);

  // Calculate the grand total
  const calculateGrandTotal = (rows) =>
    rows.reduce((total, row) => total + row.value, 0);

  // Update rows recursively
  const updateRow = (id, newValue, isPercentage = false) => {
    const updateRecursively = (rows, parentId = null) => {
      return rows.map((row) => {
        if (row.id === id) {
          const originalValue = row.value;
          const updatedValue = isPercentage
            ? originalValue + (originalValue * newValue) / 100
            : newValue;

          // Calculate variance for the current row (child)
          const variance = ((updatedValue - originalValue) / originalValue) * 100;

          row.value = updatedValue.toFixed(2);
          row.variance = variance.toFixed(2); // Show 2 decimals

          // Remove decimals for whole number variance
          if (row.variance % 1 === 0) {
            row.variance = parseInt(row.variance, 10); // Remove decimals
          }
        }

        if (row.children) {
          // Recursively update children first
          row.children = updateRecursively(row.children, row.id);

          // Recalculate the parent's value based on the updated children's values
          row.value = row.children.reduce((sum, child) => sum + +child.value, 0);

          // Recalculate the parent's variance after children update
          const originalValue = row.value;
          const variance = ((row.value - originalValue) / originalValue) * 100;
          row.variance = variance.toFixed(2);

          // Remove decimals for whole number variance
          if (row.variance % 1 === 0) {
            row.variance = parseInt(row.variance, 10); // Remove decimals
          }
        }

        return row;
      });
    };

    // Update the rows and set state
    setRows(updateRecursively(rows));
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Label</th>
            <th>Value</th>
            <th>Input</th>
            <th>Allocation %</th>
            <th>Allocation Val</th>
            <th>Variance</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <Row key={row.id} row={row} updateRow={updateRow} />
          ))}
          <tr>
            <td><strong>Grand Total</strong></td>
            <td><strong>{calculateGrandTotal(rows)}</strong></td>
            <td colSpan="2"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
