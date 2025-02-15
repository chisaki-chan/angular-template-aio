declare global {
  interface Window {
    electronAPI?: {
      closeWindow: () => void;
      minimizeWindow: () => void;
      maximizeWindow: () => void;
      showNotification: () => void;
    };
  }
}

export {};