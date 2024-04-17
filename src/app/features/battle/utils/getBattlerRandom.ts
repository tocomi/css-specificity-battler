import { Battler } from '../types';

export const getBattlerRandom = (battlers: Battler[]) => {
  const randomIndex = Math.floor(Math.random() * battlers.length);
  return battlers[randomIndex];
};

/**
 * player の候補者を 3 人ランダムに選出する
 * - 強すぎたり弱すぎたりすると面白くないので、配列の中央 40% - 60% くらいのところからランダムで選出する
 */
export const getCandidates = (battlers: Battler[]) => {
  const startIndex = Math.floor(battlers.length * 0.4);
  const endIndex = Math.floor(battlers.length * 0.6);
  const candidates = battlers.slice(startIndex, endIndex);
  const shuffledCandidates = candidates.sort(() => Math.random() - 0.5);
  return shuffledCandidates.slice(0, 3);
};
