import { useState, useCallback } from 'react';

export const useGetCssSelector = () => {
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

  return { cssSelectors, isLoading, getCssSelector };
};
