import React, { useState } from "react";
import { rtConnection } from "../service/socket";
import ModalPaint from "./ModalPaind";

const SIZE = 20;
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

  /****
   * This code belongs to the logic of finding a selected area. 
   * It will be used in the future for a new view.
  */
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
            className="square"
            style={{
              position: "absolute",
              top: y * SIZE + "px",
              left: x * SIZE + "px",
              width: SIZE + "px",
              height: SIZE + "px",
              border: "1px dashed gray",
              backgroundImage: `url(${colItem?.image})`,
              backgroundSize: "contain",
            }}
            onClick={handleClick(y, x)}
          />
        ))
      )}
      {
        showModal && <ModalPaint showModal={setShowModal} col={modalX} row={modalY} />
      }
    </div>
  );
};
export { MainCanvas };
