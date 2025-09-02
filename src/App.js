import React, { useState } from 'react';
import './App.css';

const names = [
  'Zareena', 'Nyamath', 'Baitulla', 'Abdul', 'Shafi', 
  'Shahinoor', 'Shaista', 'Ruqiya', 'Jameela', 'Junaid', 'Shireen',
  'Parveen', 'Shaheen', 'Shazia', 'Rehan'
];

const SpinWheelGame = () => {
  const [angle, setAngle] = useState(0);
  const [winner, setWinner] = useState(null);

  const spin = () => {
    const slice = 360 / names.length;
    const selected = Math.floor(Math.random() * names.length);
    const pointerOffset = 270; // because the pointer is at 12 o'clock
    const rotation = 5 * 360 + (pointerOffset - selected * slice - slice / 2);
    setAngle(rotation);
    setTimeout(() => setWinner(names[selected]), 4500);
  };

  return (
    <div className="container">
      <h2>💵Chiti Name Selector💵</h2>
      <div className="wheel-wrapper">
        <svg
          width="400"
          height="400"
          viewBox="0 0 400 400"
          className="wheel"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          <g transform="translate(200,200)">
            {names.map((name, i) => {
              const sliceAngle = 360 / names.length;
              const startAngle = i * sliceAngle;
              const endAngle = startAngle + sliceAngle;
              const largeArc = sliceAngle > 180 ? 1 : 0;
              const radius = 200;
              const x1 = radius * Math.cos((Math.PI / 180) * startAngle);
              const y1 = radius * Math.sin((Math.PI / 180) * startAngle);
              const x2 = radius * Math.cos((Math.PI / 180) * endAngle);
              const y2 = radius * Math.sin((Math.PI / 180) * endAngle);
              const pathData = `M0,0 L${x1},${y1} A${radius},${radius} 0 ${largeArc},1 ${x2},${y2} Z`;

              const textAngle = startAngle + sliceAngle / 2;
              const textRadius = 130;
              const textX = textRadius * Math.cos((Math.PI / 180) * textAngle);
              const textY = textRadius * Math.sin((Math.PI / 180) * textAngle);

              return (
                <g key={i}>
                  <path
                    d={pathData}
                    fill={`hsl(${(i * 360) / names.length}, 70%, 70%)`}
                    stroke="#fff"
                  />
                  <text
                    x={textX}
                    y={textY}
                    fill="#000"
                    fontSize="12"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${textAngle}, ${textX}, ${textY})`}
                  >
                    {name}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
        <div className="pointer"></div>
      </div>
      <button onClick={spin} className="spin-btn">Spin</button>
      {winner && <div className="winner">Winner: {winner}</div>}
    </div>
  );
};

export default SpinWheelGame;
