import { memo } from 'react';
import { Button } from '../../ui';
import { useGetCssSelector } from '../css-selector';

export const BattleScreen = memo(function BattleScreen() {
  const { selectorsWithSpecificity, isLoading, getCssSelector } = useGetCssSelector();

  return (
    <div className="p-2">
      <Button onClick={getCssSelector}>getCssSelector</Button>
      {isLoading && <div>Loading...</div>}
      {selectorsWithSpecificity.map((selectorsWithSpecificity, index) => (
        <div key={index}>
          {`${selectorsWithSpecificity.selector} ${selectorsWithSpecificity.specificity.A}-${selectorsWithSpecificity.specificity.B}-${selectorsWithSpecificity.specificity.C}`}
        </div>
      ))}
    </div>
  );
});
