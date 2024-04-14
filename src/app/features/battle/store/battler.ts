import { atom, useAtomValue, useSetAtom } from 'jotai';
import { SelectorWithSpecificity } from '../../css-selector/types';

const battlersAtom = atom<SelectorWithSpecificity[]>([]);

export const useBattlers = () => {
  const battlers = useAtomValue(battlersAtom);
  return battlers;
};

export const useRegisterBattlers = () => {
  const setBattlers = useSetAtom(battlersAtom);
  return setBattlers;
};
