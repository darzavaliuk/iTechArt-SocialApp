import React, { useRef } from 'react';
import ToastContext from '../toasterContext';
import Toast from '../../components/Toast/Toast';

interface ToastContextProviderProps {
  children: React.ReactNode;
}

interface ToastRef {
  show: (options: { type: string; text: string; duration: number }) => void;
}

export const ToastContextProvider = ({ children }: ToastContextProviderProps) => {
  const toastRef = useRef<ToastRef | null>(null);

  const showToast = (type: string, text: string, duration: number): void => {
    toastRef?.current?.show({ type, text, duration });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast ref={toastRef} />
      {children}
    </ToastContext.Provider>
  );
};
