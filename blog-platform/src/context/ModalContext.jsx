import { createContext, useContext, useState, useCallback, useMemo } from 'react';

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [modals, setModals] = useState([]);

  const openModal = useCallback((modal) => {
    const id = modal.id || `modal-${Date.now()}`;
    setModals(prev => [...prev, { ...modal, id, isOpen: true }]);
    document.body.style.overflow = 'hidden';
    return id;
  }, []);

  const closeModal = useCallback((id) => {
    setModals(prev => {
      const next = prev.filter(m => m.id !== id);
      if (next.length === 0) document.body.style.overflow = '';
      return next;
    });
  }, []);

  const closeAllModals = useCallback(() => {
    setModals([]);
    document.body.style.overflow = '';
  }, []);

  const updateModal = useCallback((id, updates) => {
    setModals(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
  }, []);

  const value = useMemo(() => ({
    modals,
    openModal,
    closeModal,
    closeAllModals,
    updateModal,
  }), [modals, openModal, closeModal, closeAllModals, updateModal]);

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}