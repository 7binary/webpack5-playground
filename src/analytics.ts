interface Analytics {
  destroy: () => void;
  getClicks: () => number;
  isDestroyed: () => boolean;
}

function createAnalytics(): Analytics {
  let counter = 0;
  let destroyed = false;

  const listener = () => counter++;
  document.addEventListener('click', listener);

  return {
    destroy() {
      document.removeEventListener('click', listener);
      destroyed = true;
    },
    isDestroyed() {
      return destroyed;
    },
    getClicks() {
      return counter;
    },
  };
}

(window as any).analytics = createAnalytics();

export {};
