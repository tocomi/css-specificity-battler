import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useBattlers, useEnemy, usePlayer, useUpdateStage } from '../store';
import { Battler as BattlerType, Result as ResultType } from '../types';
import { Button, Progress } from '../../../ui';
import { getWinner } from '../utils';
import { useSetNewEnemy, useTimer } from '../hooks';

export const Battle = memo(function Battle() {
  const battlers = useBattlers();
  const player = usePlayer();
  const enemy = useEnemy();

  const [result, setResult] = useState<ResultType>('beforeBattle');
  const [winCount, setWinCount] = useState(0);

  const winner = useMemo(() => {
    return getWinner({ player, enemy });
  }, [enemy, player]);

  const fight = useCallback(() => {
    if (winner === 'player') {
      setResult('win');
      setWinCount((prev) => prev + 1);
      return;
    }
    if (winner === 'enemy') {
      setResult('lose');
      return;
    }
    setResult('draw');
  }, [winner]);

  const escape = useCallback(() => {
    if (winner === 'player') {
      setResult('lose');
      return;
    }
    if (winner === 'enemy') {
      setResult('win');
      setWinCount((prev) => prev + 1);
      return;
    }
    setResult('draw');
  }, [winner]);

  const { timeLeft, start: startTimer, stop: stopTimer, reset: resetTimer } = useTimer(5000);
  useEffect(() => {
    if (result === 'beforeBattle') {
      startTimer();
    }
    if (result !== 'beforeBattle') {
      stopTimer();
    }
  }, [result, startTimer, stopTimer]);

  const timeUp = timeLeft === 0;
  useEffect(() => {
    if (timeUp) {
      setResult('lose');
    }
  }, [timeUp]);

  const resetResult = useCallback(() => {
    resetTimer();
    setResult('beforeBattle');
  }, [resetTimer]);

  return (
    <div className="flex flex-col gap-4 pt-4 h-full">
      <div className="flex flex-row justify-around items-start gap-2 flex-grow">
        <Battler battler={player} type="player" displaySpecificity />
        <Battler battler={enemy} type="enemy" displaySpecificity={result !== 'beforeBattle'} />
      </div>
      <div className="mt-4 h-20">
        {result === 'beforeBattle' && <Commands onFight={fight} onEscape={escape} />}
        {result !== 'beforeBattle' && <Result result={result} resetResult={resetResult} />}
      </div>
      <Progress value={timeLeft / 50} />
      <div className="text-center mt-4">
        <span className="text-lg font-bold text-gray-500 text-center">🚀 現在の正解数: </span>
        <span className="text-2xl font-bold text-gray-500 text-center">{winCount}</span>
      </div>
      <div className="mt-4 text-end">
        <span className="text-sm font-bold text-gray-500">{`このページの野生のセレクター数: ${battlers.length}`}</span>
      </div>
    </div>
  );
});

const Battler = memo(function Battler({
  battler,
  type,
  displaySpecificity,
}: {
  battler: BattlerType;
  type: 'player' | 'enemy';
  displaySpecificity: boolean;
}) {
  const specificity = displaySpecificity
    ? `${battler.specificity.A}-${battler.specificity.B}-${battler.specificity.C}`
    : '?-?-?';
  return (
    <div className="flex flex-col justify-between gap-1 w-[50%] h-full">
      <div className="flex flex-col gap-2 flex-grow">
        {type === 'player' ? (
          <p className="text-xl font-bold text-blue-700">あなたのセレクター</p>
        ) : (
          <p className="text-xl font-bold text-red-700">野生のセレクター</p>
        )}
        <div className="bg-gray-800 p-2 rounded-lg h-full">
          <p className="text-xl font-bold text-white">{battler.selector}</p>
        </div>
      </div>
      <div className="bg-cyan-700 rounded-md p-2">
        <span className="text-xl text-white font-bold">{`詳細度: (${specificity})`}</span>
      </div>
    </div>
  );
});

const Commands = memo(function Command({
  onFight,
  onEscape,
}: {
  onFight: () => void;
  onEscape: () => void;
}) {
  return (
    <div className="flex justify-center gap-6">
      <div className="flex items-center gap-2">
        <span className="text-sm opacity-50">自分の方が詳細度が高い 👉</span>
        <Button onClick={onFight}>たたかう</Button>
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={onEscape}>にげる</Button>
        <span className="text-sm opacity-50">👈 相手の方が詳細度が高い</span>
      </div>
    </div>
  );
});

export const Result = memo(function Result({
  result,
  resetResult,
}: {
  result: ResultType;
  resetResult: () => void;
}) {
  const updateStage = useUpdateStage();
  const setNewEnemy = useSetNewEnemy();

  const retry = useCallback(() => {
    resetResult();
    updateStage('opening');
  }, [updateStage, resetResult]);

  const next = useCallback(() => {
    setNewEnemy();
    resetResult();
  }, [setNewEnemy, resetResult]);

  if (result === 'beforeBattle') {
    return null;
  }
  return (
    <div className="flex flex-col items-center gap-4">
      {result === 'win' || result === 'draw' ? (
        <Button onClick={next}>続ける</Button>
      ) : (
        <Button onClick={retry}>もう一回！</Button>
      )}
      <p className="text-xl">
        {result === 'win' ? '🥳 正解！' : result === 'lose' ? '😭 残念！' : '👶 引き分け'}
      </p>
    </div>
  );
});
