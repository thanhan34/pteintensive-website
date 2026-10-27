'use client';

import { ToastContainer } from 'react-toastify';

export function ToastProvider() {
  return <ToastContainer
    position="top-right"
    autoClose={10000}
    limit={3}
    newestOnTop
    closeOnClick={false}
    pauseOnHover
    pauseOnFocusLoss
    draggable={false}
    theme="light"
    className="app-toast-container"
    aria-label="Thông báo hệ thống. Nhấn Alt + T để đến thông báo."
  />;
}