import create from 'zustand';

const useImageStore = create((set) => ({
  // State:
  selectedSquares: Array(50).fill(Array(50).fill(false)), 
  imageArea: { minX: 0, minY: 0, maxX: 0, maxY: 0 }, 

  // Method:
  setImageArea: (area) => set({ imageArea: area }), 
  setSelectedSquares: (squares) => set({ selectedSquares: squares }),
}));

export default useImageStore;