interface ButtonProps {
  children?: React.ReactNode;
  onClick: () => void;
  className: string;
  label: string;
}
export default function UiButton(props: ButtonProps) {
  const { children, onClick, className, label } = props;
  return (
    <button
      className={`${className} cursor-pointer`}
      onClick={onClick}
    >
      {label ?? children}
    </button>
  );
}
