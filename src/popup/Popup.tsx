import { useCallback, useState } from 'react';
import { Button } from '../app/ui/Button';

const Popup = () => {
  document.body.className = 'w-[50rem] h-[30rem]';

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
};

export default Popup;
