import React from "react";

const CurrentSectionMarker = ({ color }) => {
  return (
    <span
      className={`bg-orange-500 text-white text-[10px] px-2 py-1 rounded-full font-black`}
      style={{
        backgroundColor: color ? color : "",
      }}
    >
      ORA
    </span>
  );
};

export default CurrentSectionMarker;
