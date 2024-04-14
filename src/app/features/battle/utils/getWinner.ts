import { compare } from 'specificity';
import { Battler, Winner } from '../types';

export const getWinner = ({ player, enemy }: { player: Battler; enemy: Battler }): Winner => {
  const result = compare(player.specificity, enemy.specificity);

  if (result === 1) {
    return 'player';
  }
  if (result === -1) {
    return 'enemy';
  }
  return 'draw';
};
