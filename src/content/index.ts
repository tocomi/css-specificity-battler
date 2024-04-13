/* eslint-disable @typescript-eslint/ban-ts-comment */
import 'webextension-polyfill';
import 'construct-style-sheets-polyfill';
import { proxyStore } from '../app/proxyStore';

declare global {
  interface CSSRule {
    selectorText: string;
  }
}

/**
 * Get all CSS selectors from the current page.
 */
const getCssSelectors = (): string[] => {
  const cssSelectors = new Set<string>();
  Array.from(document.styleSheets).forEach((styleSheet) => {
    try {
      Array.from(styleSheet.cssRules).forEach((rule) => {
        cssSelectors.add(rule.selectorText);
      });
    } catch (e) {
      // エラーになるのは仕方ないので無視する
    }
  });

  return Array.from(cssSelectors);
};

proxyStore.ready().then(() => {
  chrome.runtime.onMessage.addListener(
    (request: { type: 'getCssSelectors' }, _sender, sendResponse) => {
      if (request.type === 'getCssSelectors') {
        sendResponse(getCssSelectors());
      }
    }
  );
});
