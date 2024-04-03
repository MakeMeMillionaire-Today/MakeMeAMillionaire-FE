import React, { useState } from 'react';

function Square(props) {
  return (
    <div
      className="square"
      style={{
        width: '10px',
        height: '10px',
        backgroundColor: props.selected ? 'red' : 'white',
        border: '1px solid black',
      }}
      onClick={() => props.onClick(props.row, props.col)}
    />
  );
}

function ImageSelector({imageURL}) {
  const [selectedSquares, setSelectedSquares] = useState(Array(50).fill(Array(50).fill(false)));

  const handleClick = (row, col) => {
    const updatedSelectedSquares = selectedSquares.map((rowArray, rowIndex) =>
      row === rowIndex ? rowArray.map((val, colIndex) => (col === colIndex ? !val : val)) : rowArray
    );
    setSelectedSquares(updatedSelectedSquares);
  };

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
          {selectedSquares.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: 'flex' }}>
              {row.map((selected, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  style={{
                    width: '10px',
                    height: '10px',
                    position: 'relative',
                  }}
                >
                  {selected && (
                    <img
                      src={imageURL}
                      alt="Selected Image"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '10px',
                        height: '10px',
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageSelector;