import { FC } from 'react';

import { Portal, CrossIcon } from '../';

import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  modalTitle: string;
  closeModalHandler: () => void,
}

const Modal: FC<ModalProps> = ({
  isOpen,
  modalTitle,
  closeModalHandler,
  children,
}) => {
  return !isOpen
    ? null
    : (
      <Portal>
        <div className={styles.modalWrapper}>
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
                <CrossIcon/>;
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
