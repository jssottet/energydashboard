export function scheduleWindmillProduction(queue, currentTime) {
  const windSpeed = 20 + 10 * Math.sin(currentTime / 5); // pseudo-random
  const energy = Math.max(0, windSpeed * 0.5); // convert to power

  queue.push({
    time: currentTime + 1,
    type: 'ENERGY_PRODUCED',
    data: { energy },
  });
}
