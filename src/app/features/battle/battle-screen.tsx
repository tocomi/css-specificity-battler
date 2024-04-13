import { memo, useCallback, useState } from 'react';
import { Button } from '../../ui';

export const BattleScreen = memo(function BattleScreen() {
  const [cssSelectors, setCssSelectors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getCssSelector = useCallback(() => {
    setIsLoading(true);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs[0].id) return;
      chrome.tabs.sendMessage(tabs[0].id, { type: 'getCssSelectors' }, (response: string[]) => {
        setCssSelectors(response);
        setIsLoading(false);
      });
    });
  }, []);

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
