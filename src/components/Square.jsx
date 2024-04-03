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

  export default Square;