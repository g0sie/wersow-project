import React, { useEffect, useState } from "react";

export interface WithMousePositionProps {
  mouseX: number;
  mouseY: number;
}

function withMousePosition<P>(
  WrappedComponent: React.ComponentType<P & WithMousePositionProps>
) {
  const ComponentWithMousePosition = (props: P) => {
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);

    useEffect(() => {
      window.addEventListener("mousemove", (event) => {
        setMouseX(event.x);
        setMouseY(event.y);
      });
    }, []);

    return <WrappedComponent {...props} mouseX={mouseX} mouseY={mouseY} />;
  };
  return ComponentWithMousePosition;
}

export default withMousePosition;
