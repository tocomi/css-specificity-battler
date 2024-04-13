declare global {
  interface CSSRule {
    selectorText: string;
  }
}

/**
 * Get all CSS selectors from the current page.
 */
export const getCssSelectors = (): string[] => {
  const cssSelectors = new Set<string>();
  Array.from(document.styleSheets).forEach((styleSheet) => {
    try {
      Array.from(styleSheet.cssRules).forEach((rule) => {
        cssSelectors.add(rule.selectorText);
      });
    } catch (e) {
      // cross-origin でエラーが出るのは仕方ないので無視する
    }
  });

  return Array.from(cssSelectors);
};
