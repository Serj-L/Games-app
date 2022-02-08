import { FC, useEffect, useRef, useState } from 'react';

import { Portal, CrossIcon } from '../';

import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  modalTitle: string;
  windowScrollTopOffset: number,
  closeModalHandler: () => void,
}

const Modal: FC<ModalProps> = ({
  isOpen,
  modalTitle,
  windowScrollTopOffset,
  closeModalHandler,
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const modalWrapper = useRef<HTMLDivElement>(null);

  // needed to managing Modal closing animation
  useEffect(() => {
    if (isOpen) {
      setIsModalOpen(true);
    } else {
      setTimeout(() => {
        setIsModalOpen(false);
      }, 300);
    }
  }, [isOpen]);

  // prevent body scrolling and focused on Modal wrapper to enable handling Modal closing when Esc button is press
  useEffect(() => {
    if (isModalOpen) {
      modalWrapper.current?.focus();
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [isModalOpen]);

  return !isModalOpen
    ? null
    : (
      <Portal>
        <div
          className={styles.modalWrapper}
          style={{ top: windowScrollTopOffset }}
          data-is-close-animate={!isOpen}
          ref={modalWrapper}
          tabIndex={1}
          onKeyUp={(event) => {
            if (event.key === 'Escape') {
              closeModalHandler();
            }
          }}
        >
          <div
            className={styles.modalOverlay}
            onClick={closeModalHandler}
          />
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>{modalTitle}</h3>
              <button
                className={styles.btnClose}
                onClick = {closeModalHandler}
              >
                <CrossIcon />
              </button>
            </div>
            <div className={styles.modalContent}>
              {children}
            </div>
          </div>

        </div>
      </Portal>
    );
};

export default Modal;
