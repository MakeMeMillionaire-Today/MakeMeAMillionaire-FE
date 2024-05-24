import React, { useState } from "react";
import ModalPaint from "./ModalPaind";

const SIZE = 20;
const MainCanvas = ({ matrix }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalX, setModalX] = useState(null);
  const [modalY, setModalY] = useState(null);
  const [dataItem, setDataItem] = useState({});

  // Handle area:
  const handleClick =
    ({ row, col, colItem }) =>
    () => {
      setDataItem(colItem);
      setModalY(row);
      setModalX(col);
      setShowModal(true);
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
    <div className="square-container">
      {matrix.map((row, y) =>
        row.map((colItem, x) => (
          <div
            key={`${x}-${y}`}
            className="square"
            style={{
              top: y * SIZE + "px",
              left: x * SIZE + "px",
              width: SIZE + "px",
              height: SIZE + "px",
              border: "1px dashed gray",
              backgroundImage: `url(${colItem?.image})`,
              backgroundSize: "contain",
            }}
            onClick={handleClick({ row: y, col: x, colItem })}
          />
        ))
      )}
      {showModal && (
        <ModalPaint
          showModal={setShowModal}
          col={modalX}
          row={modalY}
          dataItem={dataItem}
        />
      )}
    </div>
  );
};
export { MainCanvas };
