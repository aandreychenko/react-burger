import type { JSX } from 'react';

import styles from './modal-overlay.module.css';

function ModalOverlay({ onClose }: { onClose: () => void }): JSX.Element {
  return (
    <div className={styles.overlay} onClick={onClose} data-testid="modal-overlay" />
  );
}

export default ModalOverlay;
