import React, { useState } from "react";
import { rtConnection } from "../service/socket";
import ModalPaint from "./ModalPaind";

const SIZE = 10;
const MOCKED_IMG =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAABLSURBVChTjY4BCgAgCAN7S+/ps73QWDSZotDByOg0hyXmXq+KXBGPFPTUJp+YBZVQt6LWyNALoxIJO+Yo4etOAi6SSgLljlU+J5odBf04nLbgNmAAAAAASUVORK5CYII=";

const MainCanvas = ({ matrix, imageURL }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalX, setModalX] = useState(null);
  const [modalY, setModalY] = useState(null);
  
  // Handle area:
  const handleClick = (row, col) => () => {
    setModalY(row);
    setModalX(col);
    setShowModal(true)
  };
  // Calculate area:
  // const calculateSelectedArea = () => {
  //   let minX;
  //   let minY;
  //   let maxX;
  //   let maxY;

  //   matrix.forEach((row, rowIndex) => {
  //     row.forEach((selected, colIndex) => {
  //       if (selected) {
  //         minX = Math.min(minX, colIndex);
  //         minY = Math.min(minY, rowIndex);
  //         maxX = Math.max(maxX, colIndex);
  //         maxY = Math.max(maxY, rowIndex);
  //       }
  //     });
  //   });

  //   return { minX, minY, maxX, maxY };
  // };
  // const { minX, minY, maxX, maxY } = calculateSelectedArea();
  // const selectedWidth = (maxX - minX + 1) * 10;
  // const selectedHeight = (maxY - minY + 1) * 10;

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
              backgroundImage: `url(${colItem?.image})`,
              backgroundSize: "contain",
            }}
            onClick={handleClick(y, x)}
          />
        ))
      )}
      {/* {imageURL && (
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
      )} */}
      {
        showModal && <ModalPaint showModal={setShowModal} col={modalY} row={modalX} />
      }
      
    </div>
  );
};
export { MainCanvas };
