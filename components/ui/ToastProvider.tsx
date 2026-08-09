'use client';

import * as React from 'react';
import { Toast, ToastData } from './Toast';

export interface ToastContextType {
  addToast: (toast: Omit<ToastData, 'id'>) => void;
  removeToast: (id: string) => void;
}

export interface ToastProviderProps {
  children: React.ReactNode;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = React.useState<ToastData[]>([]);
  const timersRef = React.useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    if (timersRef.current.has(id)) {
      clearTimeout(timersRef.current.get(id));
      timersRef.current.delete(id);
    }
  }, []);

  const addToast = React.useCallback(
    (toastData: Omit<ToastData, 'id'>) => {
      const id =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

      const duration = toastData.duration ?? 5000;
      const newToast: ToastData = { ...toastData, id };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        const timer = setTimeout(() => {
          removeToast(id);
        }, duration);
        timersRef.current.set(id, timer);
      }
    },
    [removeToast]
  );

  React.useEffect(() => {
    const currentTimers = timersRef.current;
    return () => {
      currentTimers.forEach((timer) => clearTimeout(timer));
      currentTimers.clear();
    };
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div
        className="fixed bottom-6 end-6 z-50 flex flex-col gap-3 pointer-events-none"
        aria-live="polite"
        aria-atomic="false"
      >
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast toast={toast} onDismiss={removeToast} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

ToastProvider.displayName = 'ToastProvider';
