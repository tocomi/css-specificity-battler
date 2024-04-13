/* eslint-disable @typescript-eslint/ban-ts-comment */
import 'webextension-polyfill';
import 'construct-style-sheets-polyfill';
import { proxyStore } from '../app/proxyStore';

const getCssSelector = () => {
  const allElements = document.querySelectorAll('*');
  const cssRules: string[] = [];

  allElements.forEach((element) => {
    Array.from(document.styleSheets).forEach((styleSheet) => {
      try {
        Array.from(styleSheet.cssRules).forEach((rule) => {
          // @ts-expect-error
          if (element.matches(rule.selectorText)) {
            // @ts-expect-error
            cssRules.push(rule.selectorText);
          }
        });
      } catch (e) {
        console.log('Accessing the stylesheet: ', e);
      }
    });
  });

  return cssRules;
};

proxyStore.ready().then(() => {
  chrome.runtime.onMessage.addListener(
    (request: { type: 'getCssSelector' }, _sender, sendResponse) => {
      if (request.type === 'getCssSelector') {
        sendResponse(getCssSelector());
      }
    }
  );
});
