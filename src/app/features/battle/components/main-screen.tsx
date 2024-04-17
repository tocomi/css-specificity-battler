import { memo } from 'react';
import { useStage } from '../store';
import { GameStart } from './game-start';
import { Battle } from './battle';
import { SelectBuddy } from './select-buddy';

export const MainScreen = memo(function MainScreen() {
  const stage = useStage();

  return stage === 'opening' ? (
    <GameStart />
  ) : stage === 'selectBuddy' ? (
    <SelectBuddy />
  ) : (
    <Battle />
  );
});
