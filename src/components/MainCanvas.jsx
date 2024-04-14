import React from "react";
import { rtConnection } from "../service/socket";

const SIZE = 20;

const MainCanvas = ({ matrix, imageURL }) => {
  // Handle area:
  const handleClick = (row, col) => () => {
    rtConnection.emit("/canvas/update", {
      x: col,
      y: row,
      content: 1,
    });
  };
  // Calculate area:
  const calculateSelectedArea = () => {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    matrix.forEach((row, rowIndex) => {
      row.forEach((selected, colIndex) => {
        if (selected) {
          minX = Math.min(minX, colIndex);
          minY = Math.min(minY, rowIndex);
          maxX = Math.max(maxX, colIndex);
          maxY = Math.max(maxY, rowIndex);
        }
      });
    });

    return { minX, minY, maxX, maxY };
  };
  const { minX, minY, maxX, maxY } = calculateSelectedArea();
  const selectedWidth = (maxX - minX + 1) * 10;
  const selectedHeight = (maxY - minY + 1) * 10;

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
              color: colItem === 1 ? "red" : "black",
            }}
            onClick={handleClick(y, x)}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
                marginBottom: "5px",
              }}
            >
              {colItem}
            </div>
          </div>
        ))
      )}
      {imageURL && (
        <div style={{ position: "relative" }}>
          <img
            src={imageURL}
            alt="Selected Image"
            style={{
              position: "absolute",
              top: `${minY * 10}px`,
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
};
export { MainCanvas };