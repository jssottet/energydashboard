import React, { useState, useEffect, useRef } from 'react';
import EnergyScene from './EnergyScene';
import { useSimulationEngine } from './useSimulationEngine.js';

function SimulatedEnergyDashboard() {
  const [electricityInput, setElectricityInput] = useState(50);
  const [productionRate, setProductionRate] = useState(50);
  //const [tankLevel, setTankLevel] = useState(40);
  const [running, setRunning] = useState(true);
  const [speed, setSpeed] = useState(1); // 1 = normal speed

  const intervalRef = useRef(null);

  const { simTime, tankLevel, lastEnergy } = useSimulationEngine(running, speed);

/*
  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        const now = Date.now() / 1000;

        const newElectricity = 60 + 20 * Math.sin(now / (5 / speed));
        const newProduction = Math.max(0, newElectricity - 20 + 10 * Math.sin(now / (3 / speed)));

        setTankLevel(prev => {
          const change = (newProduction - 50) / 200 * speed;
          let next = prev + change;
          return Math.max(0, Math.min(100, next));
        });

        setElectricityInput(newElectricity);
        setProductionRate(newProduction);
      }, 3000);
    }

    return () => clearInterval(intervalRef.current);
  }, [running, speed]);
*/
  return (
    <div style={{ display: 'flex', padding: '20px', fontFamily: 'sans-serif' }}>
      
      {/* Left: Simulation View */}
      <div style={{
      flex: 3,
      display: 'flex',
      flexDirection: 'column',
      marginRight: 20,
      minWidth: 0,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
        <EnergyScene 
          electricityInput={electricityInput}
          productionRate={productionRate}
          tankLevel={tankLevel}
        />

        {/* Controls */}
        <div style={{ marginTop: '20px' }}>
          <button onClick={() => setRunning(r => !r)}>
            {running ? 'Pause ⏸️' : 'Play ▶️'}
          </button>

          <label style={{ marginLeft: '20px' }}>
            Speed: {speed.toFixed(1)}x
            <input 
              type="range"
              min="0.2"
              max="3"
              step="0.1"
              value={speed}
              onChange={e => setSpeed(parseFloat(e.target.value))}
              style={{ marginLeft: '10px', verticalAlign: 'middle' }}
            />
          </label>
        </div>
      </div>

      {/* Right: Data Panel */}
      <div style={{
       flex : 1,
        marginLeft: '40px',
        background: '#f5f5f5',
        borderRadius: '8px',
        padding: '20px',
        minWidth: '200px',
        maxWidth: '250px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
      }}>
        <h3>Live Data</h3>
        <p><strong>Electricity Input:</strong> {electricityInput.toFixed(1)}%</p>
        <p><strong>H₂ Production Rate:</strong> {productionRate.toFixed(1)}%</p>
        <p><strong>Tank Level:</strong> {tankLevel.toFixed(1)}%</p>
        <p><strong>Status:</strong> {running ? 'Running' : 'Paused'}</p>
        <p><strong>Speed:</strong> {speed.toFixed(1)}x</p>
      </div>
    </div>
  );
}

export default SimulatedEnergyDashboard;
