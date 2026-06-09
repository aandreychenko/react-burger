import type React from 'react';

import styles from './modal-overlay.module.css';

function ModalOverlay({ onClose }: { onClose: () => void }): React.JSX.Element {
  return <div className={styles.overlay} onClick={onClose} />;
}

export default ModalOverlay;
