import React from 'react';

function Test() {
  const handleClick = (event) => {
    event.stopPropagation();
    console.log('Button clicked');
  };

  return (
    <div onClick={() => console.log('Div clicked')}>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

export default Test;