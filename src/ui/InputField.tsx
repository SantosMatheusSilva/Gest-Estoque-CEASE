/* import {
  Description,
  Input,
  Label,
  TextField,
  FieldError,
  TextFieldProps,
  InputProps,
} from "@heroui/react";

interface InputFieldProps extends TextFieldProps {
  label: string;
  description?: string;
  errorMessage?: string;
  className?: string;
}

export function InputField({
  label,
  description,
  errorMessage,
  className,
  ...props
}: InputFieldProps) {
  return (
    <TextField className={className} >
      <Label>{label}</Label>
      {description && <Description>{description}</Description>}
      <Input {...props} />
      {errorMessage && <FieldError>{errorMessage}</FieldError>}
    </TextField>
  );
}
 */
import React from "react";

interface InputFieldProps {
  label: string;
  description?: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  error?: string;
}

export function InputField({ 
  label, 
  description, 
  inputProps, 
  error 
}: InputFieldProps) {
  return (
    <div className="form-group">
      <label htmlFor={inputProps.id} className="form-label">
        {label}
      </label>
      {description && (
        <p className="text-sm text-muted">{description}</p>
      )}
      <input 
        {...inputProps} 
        className="form-control"
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${inputProps.id}-error` : undefined}
      />
      {error && (
        <p 
          id={`${inputProps.id}-error`} 
          className="mt-1 text-sm text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}


