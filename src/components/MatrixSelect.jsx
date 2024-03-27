import React, { useState } from 'react';

const MatrixSelect = () => {
  // define matrix
  const rows = 50;
  const cols = 50;
  const [matrixColors, setMatrixColors] = useState(Array(rows).fill(Array(cols).fill('blue')));
  
  const handleSquareClick = (i, j) => {
    const newMatrixColors = matrixColors.map((row, rowIndex) => {
      if (rowIndex === i) {
        return row.map((color, colIndex) => {
          if (colIndex === j) {
            return color === 'blue' ? 'red' : 'blue';
          }
          return color;
        });
      }
      return row;
    });
    setMatrixColors(newMatrixColors);
  };
  const matrix = matrixColors.map((row, i) => (
    <div key={i} style={{ overflow: 'hidden' }}>
      {row.map((color, j) => (
        <div
          key={`${i}-${j}`}
          onClick={() => handleSquareClick(i, j)}
          style={{
            width: '10px',
            height: '10px',
            backgroundColor: color,
            border: '1px solid black',
            float: 'left',
            cursor: 'pointer'
          }}
        />
      ))}
    </div>
  ));

  return <div style={{ width: '500px', height: '500px' }}>{matrix}</div>;
};

export default MatrixSelect;