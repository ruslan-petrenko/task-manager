import { createPortal } from 'react-dom';
import Button from './Button';

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
      <div className="bg-white p-4 rounded-md">
        <h1>{title}</h1>
        <p className="mb-5">{description}</p>
        <div className="flex flex-row gap-2 justify-end">
          <Button
            className="bg-green-500 text-white p-2 rounded-md cursor-pointer"
            onClick={onConfirm}
            label="Confirm"
          />
          <Button
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
