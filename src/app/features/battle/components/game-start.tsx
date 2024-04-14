import { memo, useCallback, useState } from 'react';
import { Button } from '../../../ui';
import { useGetCssSelector } from '../../css-selector';
import { useUpdateStage } from '../store';
import { useInitializeBattler } from '../hooks';

export const GameStart = memo(function GameStart() {
  const { isLoading, getCssSelector } = useGetCssSelector();
  const updateStage = useUpdateStage();
  const initializeBattler = useInitializeBattler();
  const [canStartGame, setCanStartGame] = useState<boolean>(true);

  const startGame = useCallback(async () => {
    const battlers = await getCssSelector();
    if (battlers.length < 100) {
      setCanStartGame(false);
      return;
    }
    initializeBattler(battlers);
    updateStage('battle');
  }, [getCssSelector, initializeBattler, updateStage]);

  return (
    <div className="h-[100%] flex flex-col gap-8 justify-center items-center">
      <h1 className="text-4xl font-bold">👨‍🎨 CSS詳細度バトラー ⚔️</h1>
      <Button onClick={startGame}>ゲームを始める！</Button>
      {isLoading ? (
        <span className="text-lg">Now Loading...</span>
      ) : !canStartGame ? (
        <span className="text-lg text-orange-700">
          アクセスできるセレクタが少ないのでこのページでは遊べないみたい🥲
        </span>
      ) : (
        // NOTE: 領域確保のためのダミー要素
        // eslint-disable-next-line no-irregular-whitespace
        <span className="text-lg">　</span>
      )}
    </div>
  );
});
