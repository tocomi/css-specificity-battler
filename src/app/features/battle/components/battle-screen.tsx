import { memo } from 'react';
import { useStage } from '../store';
import { GameStart } from './game-start';
import { Battle } from './battle';

export const BattleScreen = memo(function BattleScreen() {
  const stage = useStage();

  return stage === 'opening' ? <GameStart /> : <Battle />;
});
