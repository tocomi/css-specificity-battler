import { memo } from 'react';
import { Button } from '../../ui';
import { useGetCssSelector } from '../css-selector';

export const BattleScreen = memo(function BattleScreen() {
  const { cssSelectors, isLoading, getCssSelector } = useGetCssSelector();

  return (
    <div className="p-2">
      <Button onClick={getCssSelector}>getCssSelector</Button>
      {isLoading && <div>Loading...</div>}
      {cssSelectors.map((selector, index) => (
        <div key={index}>{selector}</div>
      ))}
    </div>
  );
});
