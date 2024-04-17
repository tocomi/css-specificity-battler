import { memo, useCallback, useState } from 'react';
import { useCandidates, useSetPlayer, useUpdateStage } from '../store';
import { Button } from '../../../ui';

export const SelectBuddy = memo(function SelectBuddy() {
  const candidates = useCandidates();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const setPlayer = useSetPlayer();
  const updateStage = useUpdateStage();

  const start = useCallback(() => {
    if (selectedIndex === null) return;
    setPlayer(candidates[selectedIndex]);
    updateStage('battle');
  }, [candidates, selectedIndex, setPlayer, updateStage]);

  return (
    <div className="flex flex-col items-center justify-center space-y-4 h-full gap-6">
      <h1 className="text-3xl font-bold">👨‍🦳 好きな1匹を選ぶのじゃ</h1>
      <div className="grid grid-cols-3 gap-4">
        {candidates.map((candidate, index) => {
          const bgColor = selectedIndex === index ? 'bg-orange-700' : 'bg-gray-800';
          return (
            <div key={candidate.selector} className="flex flex-col gap-2">
              <div className={`${bgColor} p-2 rounded-lg h-full`}>
                <p className="text-xl font-bold text-white">{candidate.selector}</p>
              </div>
              <Button onClick={() => setSelectedIndex(index)}>キミに決めた！</Button>
            </div>
          );
        })}
      </div>
      <Button disabled={selectedIndex === null} onClick={start}>
        ゲームスタート！
      </Button>
    </div>
  );
});
