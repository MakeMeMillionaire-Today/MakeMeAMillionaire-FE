import React from 'react';
import imgReact from '../assets/react.svg'

const MatrixComponent = () => {
  // define matrix
  const rows = 50;
  const cols = 50;
  const createSquare = () => {
    return {
      width: '10px',
      height: '10px',
      backgroundColor: 'blue',
      border: '1px solid black',
      float: 'left'
    };
  };
  const matrix = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(
        <area key={`${i}-${j}`} shape="rect" coords={`10,10,20,20`} style={createSquare()} />
      );
    }
    matrix.push(<div key={i}>{row}</div>);
  }
  return (
    <div style={{ width: '500px', height: '500px' }}>
      <map name="matrix-map">
        {matrix}
      </map>
      {/* <img src={imgReact} useMap="#matrix-map" style={{ display: 'block', width: '100%', height: 'auto' }} /> */}
    </div>
  );
};

export default MatrixComponent;