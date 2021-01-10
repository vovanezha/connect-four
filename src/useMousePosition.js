import { useState } from "react";

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  const updateMousePosition = (event) => {
    const bounds = event.target.parentNode.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    setMousePosition({ x, y });
  };

  return {mousePosition, updateMousePosition};
};

export default useMousePosition;