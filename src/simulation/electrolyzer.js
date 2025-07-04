export function handleEnergyEvent(state, event) {
  const { energy } = event.data;
  const efficiency = 0.6;
  const hydrogenProduced = energy * efficiency;

  state.tankLevel += hydrogenProduced;
  state.tankLevel = Math.min(100, state.tankLevel); // max capacity
}
