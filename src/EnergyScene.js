// Install: npm install gsap
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
//import Windmill from './Windmill';

export default function EnergyScene({ electricityInput = 50, productionRate = 40, tankLevel = 60 }) {
  const bladesRef = useRef();
  const fillRef = useRef();
  const plantRef = useRef();

  useEffect(() => {
     const blade = bladesRef.current;

    // Kill old animations
     //gsap.killTweensOf(blade);
  
    // Blade speed based on electricity output
    gsap.to(blade, {
      rotation: 360,
      duration: Math.max(0.5, 5 - electricityInput / 20),
      repeat: -1,
      ease: 'linear',
      transformOrigin: '50% 50%'
    });
  }, [electricityInput]);

  useEffect(() => {
  
    // Hydrogen plant pulsing (color or glow)
    gsap.to(plantRef.current, {
      scale: 1 + productionRate / 200,
      duration: 0.8,
      yoyo: true,
      repeat: -1,
      transformOrigin: '50% 50%',
      ease: 'power1.inOut'
    });
  }, [productionRate]);

  useEffect(() => {
    // Tank fill animation
    const level = Math.min(Math.max(tankLevel, 0), 100);
    gsap.to(fillRef.current, {
      attr: {
        y: 120 - (level * 1.2),
        height: level * 1.2
      },
      duration: 1,
      ease: 'power1.out'
    });
  }, [tankLevel]);

  return (
    <svg viewBox="0 0 600 400">
      {/* Windmill */}
      <g transform="translate(100, 150)">
        <circle r="40" fill="#ddd" stroke="#999" strokeWidth="2" />
        <g ref={bladesRef}>
          <rect x="-5" y="-60" width="10" height="40" fill="#666" />
          <rect x="-5" y="20" width="10" height="40" fill="#666" />
          <rect x="-60" y="-5" width="40" height="10" fill="#666" />
          <rect x="20" y="-5" width="40" height="10" fill="#666" />
        </g>
      </g>

      {/* Hydrogen Plant */}
      <g transform="translate(270, 100)">
        <rect ref={plantRef} x="0" y="0" width="80" height="80" rx="10" fill="#999" stroke="#333" strokeWidth="2" />
        <text x="40" y="45" textAnchor="middle" fontSize="12" fill="white">H₂ Plant</text>
      </g>

      {/* Power line */}
      <line x1="140" y1="150" x2="265" y2="150"
            stroke="#00f" strokeWidth="3"
            strokeDasharray="10 10" />

      {/* Pipe to tank */}
      <line x1="355" y1="150" x2="500" y2="150"
            stroke="#0a0" strokeWidth="3"
            strokeDasharray="8 6" />

      {/* Hydrogen Tank */}
      <g transform="translate(500, 100)">
        <rect x="0" y="0" width="60" height="120" rx="10" fill="#ccc" stroke="#333" strokeWidth="2"/>
        <rect ref={fillRef} x="0" y="120" width="60" height="0" fill="#00c08b" />
        <text x="30" y="150" fontSize="14" textAnchor="middle" fill="#333">Tank</text>
      </g>
    </svg>
  );
}

