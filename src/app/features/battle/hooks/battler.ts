import { useCallback } from 'react';
import { Battler } from '../types';
import { useSetBattlers, useSetEnemy, useBattlers, useSetCandidates } from '../store';
import { getBattlerRandom, getCandidates } from '../utils/getBattlerRandom';

export const useInitializeBattler = () => {
  const setBattlers = useSetBattlers();
  const setCandidates = useSetCandidates();
  const setEnemy = useSetEnemy();

  return useCallback(
    (battlers: Battler[]) => {
      setBattlers(battlers);
      setCandidates(getCandidates(battlers));
      setEnemy(getBattlerRandom(battlers));
    },
    [setBattlers, setCandidates, setEnemy]
  );
};

export const useSetNewEnemy = () => {
  const setEnemy = useSetEnemy();
  const battlers = useBattlers();

  return useCallback(() => {
    setEnemy(getBattlerRandom(battlers));
  }, [battlers, setEnemy]);
};
