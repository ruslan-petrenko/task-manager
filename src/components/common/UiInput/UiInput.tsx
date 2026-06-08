import { type ComponentPropsWithoutRef, forwardRef, useId } from 'react';
import styles from './UiInput.module.css';

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
    <div className={`${styles.container} ${containerClassName}`}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <input
        ref={ref}
        id={inputId}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={`${styles.input} ${error ? styles.inputError : styles.inputNormal} ${className}`}
        {...inputProps}
      />
      {error && (
        <p id={errorId} className={styles.errorText}>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={helperId} className={styles.helperText}>
          {helperText}
        </p>
      )}
    </div>
  );
});

export default UiInput;
