import { useCallback } from 'react';
import { Battler } from '../types';
import { useSetBattlers, useSetPlayer, useSetEnemy, useBattlers } from '../store';
import { getBattlerRandom } from '../utils/getBattlerRandom';

export const useInitializeBattler = () => {
  const setBattlers = useSetBattlers();
  const setPlayer = useSetPlayer();
  const setEnemy = useSetEnemy();

  return useCallback(
    (battlers: Battler[]) => {
      setBattlers(battlers);
      setPlayer(getBattlerRandom(battlers));
      setEnemy(getBattlerRandom(battlers));
    },
    [setBattlers, setPlayer, setEnemy]
  );
};

export const useSetNewEnemy = () => {
  const setEnemy = useSetEnemy();
  const battlers = useBattlers();

  return useCallback(() => {
    setEnemy(getBattlerRandom(battlers));
  }, [battlers, setEnemy]);
};
