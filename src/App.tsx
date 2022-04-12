// App.ts

import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [offSet, setOffset] = useState();
  const [overlayStyle, setOverlayStyle] = useState({});

  const getPosition = (parent: any, overlay: any, dimension: string, position: string, mouse: number) => {
    let newPos = mouse - parent[position] - offSet[position];
    if (newPos <= 0) newPos = 0;
    if (newPos + overlay[dimension] >= parent[dimension])
      newPos = parent[dimension] - overlay[dimension];
    return newPos;
  };

  const dragOverlay = (e: any) => {
    const parent: object = e.currentTarget.parentElement.getBoundingClientRect();
    const overlay: object = e.currentTarget.getBoundingClientRect();
    let newLeft: number = getPosition(parent, overlay, "width", "left", e.pageX);
    let newTop: number = getPosition(parent, overlay, "height", "top", e.pageY);
    setOverlayStyle((prev) => {
      return { ...prev, left: `${newLeft}px`, top: `${newTop}px` };
    });
  };

  const getMousePos = (e: any) => {
    const rect = e.target.getBoundingClientRect();
    setOffset({ left: e.pageX - rect.left, top: e.pageY - rect.top });
  };

  const getOptimumHeight = (e: object) => {
    setOverlayStyle((prev) => ({
      ...prev,
      opacity: "1",
      height: `30%`
    }));
  };

  return (
    <div
      className="img-preview"
      onMouseOver={getOptimumHeight}
      // onMouseLeave={() => setOverlayStyle((prev) => ({ ...prev, opacity: 0 }))}
    >
      <div className="image__wrapper">
        <img src="https://picsum.photos/1000/600" alt="example" />
        <div
          className="draggable-overlay"
          style={overlayStyle}
          onDrag={dragOverlay}
          onDragStart={(e) => e.dataTransfer.setDragImage(new Image(), 0, 0)}
          onMouseDown={getMousePos}
          draggable
        />
      </div>
    </div>
  );
};

export default App;

// END of document
