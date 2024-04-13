/* eslint-disable @typescript-eslint/ban-ts-comment */
import 'webextension-polyfill';
import 'construct-style-sheets-polyfill';
import { proxyStore } from '../app/proxyStore';
import { getCssSelectors } from '../app/features/css-selector';

proxyStore.ready().then(() => {
  chrome.runtime.onMessage.addListener(
    (request: { type: 'getCssSelectors' }, _sender, sendResponse) => {
      if (request.type === 'getCssSelectors') {
        sendResponse(getCssSelectors());
      }
    }
  );
});
