import { atom, useAtomValue, useSetAtom } from 'jotai';
import { Battler } from '../types';

const dummyBattler: Battler = {
  selector: '.dummy',
  specificity: {
    A: 0,
    B: 0,
    C: 0,
  },
};

const battlersAtom = atom<Battler[]>([]);
const playerAtom = atom<Battler>(dummyBattler);
const enemyAtom = atom<Battler>(dummyBattler);

export const useBattlers = () => {
  const battlers = useAtomValue(battlersAtom);
  return battlers;
};

export const useSetBattlers = () => {
  const setBattlers = useSetAtom(battlersAtom);
  return setBattlers;
};

export const usePlayer = () => {
  const player = useAtomValue(playerAtom);
  return player;
};

export const useEnemy = () => {
  const enemy = useAtomValue(enemyAtom);
  return enemy;
};

export const useSetPlayer = () => {
  const setPlayer = useSetAtom(playerAtom);
  return setPlayer;
};

export const useSetEnemy = () => {
  const setEnemy = useSetAtom(enemyAtom);
  return setEnemy;
};
