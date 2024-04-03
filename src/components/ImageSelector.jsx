import React, { useState } from 'react';
import Square from './Square';

function ImageSelector({ imageURL }) {
  const [selectedSquares, setSelectedSquares] = useState(Array(50).fill(Array(50).fill(false)));

  const handleClick = (row, col) => {
    const updatedSelectedSquares = selectedSquares.map((rowArray, rowIndex) =>
      row === rowIndex ? rowArray.map((val, colIndex) => (col === colIndex ? !val : val)) : rowArray
    );
    setSelectedSquares(updatedSelectedSquares);
  };

  const calculateSelectedArea = () => {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    selectedSquares.forEach((row, rowIndex) => {
      row.forEach((selected, colIndex) => {
        if (selected) {
          minX = Math.min(minX, colIndex);
          minY = Math.min(minY, rowIndex);
          maxX = Math.max(maxX, colIndex);
          maxY = Math.max(maxY, rowIndex);
        }
      });
    });

    console.log('minY -->', minY)

    return { minX, minY, maxX, maxY };
  };

  const { minX, minY, maxX, maxY } = calculateSelectedArea();

  const selectedWidth = (maxX - minX + 1) * 10;
  const selectedHeight = (maxY - minY + 1) * 10;

  return (
    <div className="image-selector">
      {selectedSquares.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
          {row.map((selected, colIndex) => (
            <Square
              key={`${rowIndex}-${colIndex}`}
              selected={selected}
              row={rowIndex}
              col={colIndex}
              onClick={handleClick}
            />
          ))}
        </div>
      ))}
      {imageURL && (
        <div style={{ position: 'relative' }}>
          <img
            src={imageURL}
            alt="Selected Image"
            style={{
              position: 'absolute',
              top: `${minY - 473}px`,
              left: `${minX * 10}px`,
              width: `${selectedWidth}px`,
              height: `${selectedHeight}px`,
              zIndex: 1,
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ImageSelector;