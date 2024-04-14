import { atom, useAtomValue, useSetAtom } from 'jotai';
import { Stage } from '../types';

const stageAtom = atom<Stage>('opening');

export const useStage = () => {
  const stage = useAtomValue(stageAtom);
  return stage;
};

export const useUpdateStage = () => {
  const setStage = useSetAtom(stageAtom);
  return setStage;
};
