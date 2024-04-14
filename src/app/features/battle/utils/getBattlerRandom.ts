import { Battler } from '../types';

export const getBattlerRandom = (battlers: Battler[]) => {
  const randomIndex = Math.floor(Math.random() * battlers.length);
  return battlers[randomIndex];
};
