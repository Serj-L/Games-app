import { useState, useCallback } from 'react';

interface IModalParams {
  isOpen: boolean,
  scrollY: number,
}

interface IUseModal {
  modalParams: IModalParams,
  modalOpenHandler: () => void,
  modalCloseHandler: () => void,
}

export const useModal = (): IUseModal => {
  const [modalParams, setModalParams] = useState<IModalParams>({ isOpen: false, scrollY: 0 });

  const modalOpenHandler = useCallback(() => {
    setModalParams({
      isOpen: true,
      scrollY: window.scrollY || 0,
    });
  }, []);

  const modalCloseHandler = useCallback(() => {
    setModalParams(prevParams => ({ ...prevParams, isOpen: false }));
  }, []);

  return {
    modalParams,
    modalOpenHandler,
    modalCloseHandler,
  };
};
