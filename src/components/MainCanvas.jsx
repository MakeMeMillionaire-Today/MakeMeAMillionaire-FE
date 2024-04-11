import React from "react";

const SIZE = 10;

const MainCanvas = ({ matrix }) => {
  if (!matrix?.length) return null;

  return (
    <div style={{ position: "relative" }}>
      {matrix.map((row, y) =>
        row.map((colItem, x) => (
          <div
            key={`${x}-${y}`}
            style={{
              position: "absolute",
              top: y * SIZE + "px",
              left: x * SIZE + "px",
              width: SIZE + "px",
              height: SIZE + "px",
              border: "1px solid black",
              color: colItem === 1 ? 'red' : 'black',
            }}
          >
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              marginBottom: "5px"
            }}>
              {colItem}
            </div>
          </div>
        ))
      )}
    </div>
  );
};
export { MainCanvas };