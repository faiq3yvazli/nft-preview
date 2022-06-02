import { useEffect } from 'react';

export const useLazyBackground = () => {
  useEffect(() => {
    const callback = () => {
      const lazyDOMs = document.querySelectorAll('.lazy-bg');
      lazyDOMs.forEach((element) => element.classList.remove('lazy-bg'));
    };
    const observer = new MutationObserver(callback);
    callback();
    observer.observe(document.body, { attributes: true, childList: true, subtree: true });
  }, []);
};
