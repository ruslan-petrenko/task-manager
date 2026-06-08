import { type ComponentPropsWithoutRef, forwardRef, useId } from 'react';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
}

const UiInput = forwardRef<HTMLInputElement, InputProps>(function UiInput(
  { label, error, helperText, containerClassName = '', id, required, className = '', ...inputProps },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = error ? `${inputId}-error` : undefined;
  const helperId = helperText ? `${inputId}-helper` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={`flex flex-col gap-1 ${containerClassName}`}>
      <label
        htmlFor={inputId}
        className="text-sm font-medium text-gray-700 dark:text-white"
      >
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        ref={ref}
        id={inputId}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={`w-full p-2 rounded-md border dark:placeholder:text-white-400 dark:text-white border-white/70 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 ${
          error ? 'border-red-500' : 'border-gray-300'
        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
        {...inputProps}
      />
      {error && (
        <p
          id={errorId}
          className="text-sm text-red-500"
        >
          {error}
        </p>
      )}
      {helperText && !error && (
        <p
          id={helperId}
          className="text-sm text-gray-500"
        >
          {helperText}
        </p>
      )}
    </div>
  );
});

export default UiInput;
