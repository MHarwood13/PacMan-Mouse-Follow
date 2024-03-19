"use client";
import { useState, useEffect } from 'react';

export default function PacmanCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const movePacman = (e: MouseEvent) => {
      const dx = e.clientX - position.x - 25; // Adjust for the offset of pacman
      const dy = e.clientY - position.y - 25; // Adjust for the offset of pacman
      let angle = Math.atan2(dy, dx) * (180 / Math.PI);
      angle -= 90; // Adjust so the open part of the circle faces the cursor
      angle %= 360; // Ensure angle is in the range [0, 360)
      if (angle < 0) angle += 360; // Ensure positive angle

      // Calculate the rotation point based on the position of the moving parts
      const rotationPointX = position.x + 25;
      const rotationPointY = position.y;

      // Calculate the angle from the rotation point to the cursor
      const angleToCursor = Math.atan2(e.clientY - rotationPointY, e.clientX - rotationPointX) * (180 / Math.PI);

      // Adjust the rotation angle based on the angle to the cursor
      angle -= angleToCursor;

      setPosition({ x: e.clientX - 25, y: e.clientY - 25 }); // Offset position
      setRotation(angle); // Adjust rotation
    };




    window.addEventListener('mousemove', movePacman);

    return () => {
      window.removeEventListener('mousemove', movePacman);
    };
  }, [position]);

  const pacmanStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    position: 'absolute' as 'absolute',
    transition: 'top 0.2s, left 0.2s',
    transform: `rotate(${rotation}deg)`,
    transformOrigin: 'center',
  };

  return (
    <main className='bg-black w-screen h-screen'>

      <div className='pacman' style={pacmanStyle}></div>;
    </main>
  )
}
