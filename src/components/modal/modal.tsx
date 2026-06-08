import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { type ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

import type React from 'react';

import styles from './modal.module.css';

type TModalProps = {
  title?: string;
  onClose: () => void;
  children: ReactNode;
};

function Modal({ title, onClose, children }: TModalProps): React.ReactPortal | null {
  const modalPortal = document.getElementById('modal');

  const handleContentClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleEscapeClose = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeClose);

    return (): void => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscapeClose);
    };
  }, [onClose]);

  return modalPortal
    ? createPortal(
        <>
          <div className={styles.overlay} onClick={onClose} />

          <div
            className={`${styles.modal} pt-10 pr-10 pl-10 pb-15`}
            onClick={handleContentClick}
          >
            <div className={styles.headerContainer}>
              {title && <h1 className={'text text_type_main-large'}>{title}</h1>}
              <div className={styles.closeButton}>
                <CloseIcon type={'primary'} onClick={onClose} />
              </div>
            </div>
            {children}
          </div>
        </>,
        modalPortal
      )
    : null;
}

export default Modal;
