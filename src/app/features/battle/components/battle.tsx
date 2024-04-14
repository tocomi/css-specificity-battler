import { memo } from 'react';
import { useBattlers } from '../store';

export const Battle = memo(function Battle() {
  const battlers = useBattlers();

  return (
    <div>
      <ul>
        {battlers.map((battler) => (
          <li key={battler.selector}>
            <div>{battler.selector}</div>
            <div>{`(${battler.specificity.A},${battler.specificity.B},${battler.specificity.C})`}</div>
          </li>
        ))}
      </ul>
    </div>
  );
});
