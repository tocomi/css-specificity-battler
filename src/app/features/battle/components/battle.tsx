import { memo, useCallback, useMemo, useState } from 'react';
import { useBattlers, useRandomeBattler } from '../store';
import { Battler as BattlerType, Result as ResultType } from '../types';
import { Button } from '../../../ui';
import { getWinner } from '../utils';

export const Battle = memo(function Battle() {
  const battlers = useBattlers();
  const player = useRandomeBattler();
  const enemy = useRandomeBattler();

  const [result, setResult] = useState<ResultType>('beforeBattle');

  const winner = useMemo(() => {
    return getWinner({ player, enemy });
  }, [enemy, player]);

  const fight = useCallback(() => {
    if (winner === 'player') {
      setResult('win');
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
      return;
    }
    setResult('draw');
  }, [winner]);

  return (
    <div className="flex flex-col justify-center gap-4">
      <h1 className="text-2xl font-bold">{`このページの野生のセレクター数: ${battlers.length}`}</h1>
      <div className="flex flex-row justify-around gap-2">
        <Battler battler={player} type="player" />
        <Battler battler={enemy} type="enemy" />
      </div>
      <Commands onFight={fight} onEscape={escape} />
      <Result result={result} />
    </div>
  );
});

const Battler = memo(function Battler({
  battler,
  type,
}: {
  battler: BattlerType;
  type: 'player' | 'enemy';
}) {
  return (
    <div className="flex flex-col gap-2 w-[50%]">
      {type === 'player' ? (
        <p className="text-xl font-bold text-blue-700">あなたのセレクター</p>
      ) : (
        <p className="text-xl font-bold text-red-700">野生のセレクター</p>
      )}
      <div className="bg-gray-800 p-2 rounded-lg">
        <p className="text-xl font-bold text-white">{battler.selector}</p>
      </div>
      <p>{`スペシフィシティ: ${JSON.stringify(battler.specificity)}`}</p>
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
    <div className="flex justify-center gap-8">
      <Button onClick={onFight}>たたかう</Button>
      <Button onClick={onEscape}>にげる</Button>
    </div>
  );
});

const Result = memo(function Result({ result }: { result: ResultType }) {
  if (result === 'beforeBattle') {
    return null;
  }
  return (
    <div className="flex justify-center gap-8">
      <p>{result}</p>
    </div>
  );
});
