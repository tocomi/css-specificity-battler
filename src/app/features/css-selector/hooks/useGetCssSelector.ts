import { useState, useCallback } from 'react';
import { SelectorWithSpecificity } from '../types';
import { calculate, compare } from 'specificity';

export const useGetCssSelector = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getCssSelector = useCallback(() => {
    setIsLoading(true);
    return new Promise<SelectorWithSpecificity[]>((resolve) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (!tabs[0].id) return;
        chrome.tabs.sendMessage(tabs[0].id, { type: 'getCssSelectors' }, (response: string[]) => {
          const separatedSelectors = response.flatMap((selector) => selector.split(', '));
          const selectorsWithSpecificity = separatedSelectors
            .map((selector) => {
              let specificity;
              try {
                specificity = calculate(selector);
              } catch (e) {
                // 無効なセレクタは無視する
                return null;
              }
              return {
                selector,
                specificity,
              };
            })
            .filter((selector): selector is SelectorWithSpecificity => selector !== null)
            .sort((a, b) => compare(b.specificity, a.specificity));
          setIsLoading(false);
          resolve(selectorsWithSpecificity);
        });
      });
    });
  }, []);

  return { getCssSelector, isLoading };
};
