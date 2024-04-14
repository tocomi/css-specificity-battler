import { memo, useCallback } from 'react';
import { Button } from '../../../ui';
import { useGetCssSelector } from '../../css-selector';
import { useRegisterBattlers, useUpdateStage } from '../store';

export const GameStart = memo(function GameStart() {
  const { isLoading, getCssSelector } = useGetCssSelector();
  const updateStage = useUpdateStage();
  const registerBattlers = useRegisterBattlers();

  const startGame = useCallback(async () => {
    const battlers = await getCssSelector();
    registerBattlers(battlers);
    updateStage('battle');
  }, [getCssSelector, registerBattlers, updateStage]);

  return (
    <div className="h-[100%] flex flex-col gap-8 justify-center items-center">
      <h1 className="text-4xl font-bold">👨‍🎨 CSS詳細度バトラー ⚔️</h1>
      <Button onClick={startGame}>ゲームを始める！</Button>
      {isLoading && <div>Now Loading...</div>}
    </div>
  );
});
