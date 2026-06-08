import { createPortal } from 'react-dom';
import UiButton from './UiButton';

interface ConfirmationDialogProps {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}
export default function ConfirmationDialog(props: ConfirmationDialogProps) {
  const { title, description, onConfirm, onCancel } = props;
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 ">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-md">
        <h1 className="font-semibold dark:text-white">{title}</h1>
        <p className="mb-5 text-gray-600 dark:text-gray-400">{description}</p>
        <div className="flex flex-row gap-2 justify-end">
          <UiButton
            className="bg-green-500 text-white p-2 rounded-md cursor-pointer"
            onClick={onConfirm}
            label="Confirm"
          />
          <UiButton
            className="bg-red-500 text-white p-2 rounded-md cursor-pointer"
            onClick={onCancel}
            label="Cancel"
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}
