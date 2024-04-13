import 'webextension-polyfill';
import 'construct-style-sheets-polyfill';
import { proxyStore } from '../app/proxyStore';

proxyStore.ready().then(() => {
  const allElements = document.querySelectorAll('*');
  const cssRules: CSSRule[] = [];

  allElements.forEach((element) => {
    Array.from(document.styleSheets).forEach((styleSheet) => {
      try {
        Array.from(styleSheet.cssRules).forEach((rule) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          if (element.matches(rule.selectorText)) {
            cssRules.push(rule);
          }
        });
      } catch (e) {
        console.log('Accessing the stylesheet: ', e);
      }
    });
  });

  console.log(cssRules);
});
