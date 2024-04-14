import { atom, useAtomValue, useSetAtom } from 'jotai';
import { Battler } from '../types';

const battlersAtom = atom<Battler[]>([]);

export const useBattlers = () => {
  const battlers = useAtomValue(battlersAtom);
  return battlers;
};

export const useRegisterBattlers = () => {
  const setBattlers = useSetAtom(battlersAtom);
  return setBattlers;
};

export const useRandomeBattler = () => {
  const battlers = useBattlers();
  const randomIndex = Math.floor(Math.random() * battlers.length);
  return battlers[randomIndex];
};
