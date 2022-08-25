import React, { useEffect } from 'react';

const Canvas = () => {
  useEffect(() => {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    var points = [
      [0, 85],
      [75, 75],
      [100, 10],
      [125, 75],
      [200, 85],
      [150, 125],
      [160, 190],
      [100, 150],
      [40, 190],
      [50, 125],
      [0, 85],
    ];
    ctx.moveTo(points[0][0], points[0][1]);
    ctx.beginPath();
    for (var i = 0; i < points.length; i++) {
      ctx.lineTo(points[i][0] / 3, points[i][1] / 3);
    }
    ctx.fillStyle = 'purple';
    ctx.fill();
  }, []);
  return (
    <div>
      <canvas
        id='myCanvas'
        style={{ position: 'relative' }}
        width={200}
        height={200}
      >
        Your browser does not support the HTML canvas tag.
      </canvas>
    </div>
  );
};

export default Canvas;
