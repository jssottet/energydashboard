import { useEffect, useState, useRef } from 'react';
import { EventQueue } from './simulation/desEngine';
import { scheduleWindmillProduction } from './simulation/windmill';
import { handleEnergyEvent } from './simulation/electrolyzer';

export function useSimulationEngine(running, speed = 1) {

 //init
  const [state, setState] = useState({
    simTime: 0,
    tankLevel: 0,
    lastEnergy: 0,
  });

  const queue = useRef(new EventQueue());

  useEffect(() => {
    if (!running) return;
    let lastRealTime = performance.now();

    const tick = () => {
      const now = performance.now();
      const elapsed = (now - lastRealTime) / 1000;
      lastRealTime = now;

      const simDelta = elapsed * speed;
      let simTime = state.simTime + simDelta;

      // Schedule next windmill output
      scheduleWindmillProduction(queue.current, simTime);

      while (!queue.current.isEmpty() && queue.current.peek().time <= simTime) {
        const event = queue.current.next();

        if (event.type === 'ENERGY_PRODUCED') {
          handleEnergyEvent(state, event);
          state.lastEnergy = event.data.energy;
        }
      }

      setState({ ...state, simTime });
      requestAnimationFrame(tick);
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, speed]);

  return state;
}
