import {
  Description,
  Input,
  Label,
  TextField,
  FieldError,
  TextFieldProps,
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
    <TextField className={className} {...props}>
      <Label>{label}</Label>
      {description && <Description>{description}</Description>}
      <Input />
      {errorMessage && <FieldError>{errorMessage}</FieldError>}
    </TextField>
  );
}
