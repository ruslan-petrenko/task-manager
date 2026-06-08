interface ButtonProps {
  children?: React.ReactNode;
  onClick: () => void;
  className: string;
  label: string;
}
export default function Button(props: ButtonProps) {
  const { children, onClick, className, label } = props;
  return (
    <button
      className={className}
      onClick={onClick}
    >
      {label ?? children}
    </button>
  );
}
