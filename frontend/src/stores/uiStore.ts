import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface Modal {
  id: string;
  isOpen: boolean;
  title?: string;
  content?: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface UIState {
  isLoading: boolean;
  toasts: Toast[];
  modals: Modal[];
  sidebarOpen: boolean;
}

interface UIActions {
  setLoading: (isLoading: boolean) => void;
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
  openModal: (modal: Omit<Modal, 'isOpen'>) => void;
  closeModal: (id: string) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

type UIStore = UIState & UIActions;

export const useUIStore = create<UIStore>()(
  devtools(
    (set) => ({
      // State
      isLoading: false,
      toasts: [],
      modals: [],
      sidebarOpen: true,

      // Actions
      setLoading: (isLoading) => set({ isLoading }),

      showToast: (message, type = 'info', duration = 5000) => {
        const id = `toast-${Date.now()}-${Math.random()}`;
        const toast: Toast = { id, message, type, duration };

        set((state) => ({
          toasts: [...state.toasts, toast],
        }));

        // Auto remove toast after duration
        if (duration > 0) {
          setTimeout(() => {
            set((state) => ({
              toasts: state.toasts.filter((t) => t.id !== id),
            }));
          }, duration);
        }
      },

      removeToast: (id) =>
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        })),

      openModal: (modal) =>
        set((state) => ({
          modals: [...state.modals, { ...modal, isOpen: true }],
        })),

      closeModal: (id) =>
        set((state) => ({
          modals: state.modals.filter((m) => m.id !== id),
        })),

      toggleSidebar: () =>
        set((state) => ({
          sidebarOpen: !state.sidebarOpen,
        })),

      setSidebarOpen: (open) => set({ sidebarOpen: open }),
    }),
    { name: 'UIStore' }
  )
);
