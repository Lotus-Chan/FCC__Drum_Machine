import React from "react";

const Display = (props) => {
  const { currentPad } = props;
  return (
    <div id="display">
      <div id="sound-name"> {currentPad && <div>{currentPad.name}</div>}</div>
    </div>
  );
};

export default Display;
