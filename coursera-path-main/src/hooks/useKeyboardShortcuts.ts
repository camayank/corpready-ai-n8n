import { useEffect } from 'react';

interface ShortcutConfig {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  metaKey?: boolean;
  callback: () => void;
  description?: string;
}

export const useKeyboardShortcuts = (shortcuts: ShortcutConfig[]) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      shortcuts.forEach(({ key, ctrlKey, shiftKey, metaKey, callback }) => {
        const matchesKey = event.key.toLowerCase() === key.toLowerCase();
        const matchesCtrl = ctrlKey === undefined || event.ctrlKey === ctrlKey;
        const matchesShift = shiftKey === undefined || event.shiftKey === shiftKey;
        const matchesMeta = metaKey === undefined || event.metaKey === metaKey;

        if (matchesKey && matchesCtrl && matchesShift && matchesMeta) {
          // Don't trigger if user is typing in an input
          const target = event.target as HTMLElement;
          if (
            target.tagName === 'INPUT' ||
            target.tagName === 'TEXTAREA' ||
            target.isContentEditable
          ) {
            // Allow "/" to focus search even in inputs
            if (key === '/') {
              event.preventDefault();
              callback();
            }
            return;
          }

          event.preventDefault();
          callback();
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
};
