import { createPortal } from 'react-dom';
import UiButton from '@/components/common/UiButton/UiButton';
import styles from './ConfirmationDialog.module.css';

interface ConfirmationDialogProps {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationDialog({ title, description, onConfirm, onCancel }: ConfirmationDialogProps) {
  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        <div className={styles.actions}>
          <UiButton className={styles.btnConfirm} onClick={onConfirm} label="Confirm" />
          <UiButton className={styles.btnCancel} onClick={onCancel} label="Cancel" />
        </div>
      </div>
    </div>,
    document.body,
  );
}
