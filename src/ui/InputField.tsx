import {
  Description,
  Input,
  Label,
  TextField,
  FieldError,
  TextFieldProps,
  InputProps,
} from "@heroui/react";

interface InputFieldProps extends Omit<TextFieldProps, "children"> {
  label: string;
  description?: string;
  className?: string;
  inputProps?: InputProps;
  error?: string;
}

export function InputField({
  label,
  description,
  error,
  className,
  inputProps,
  ...textFieldProps
}: InputFieldProps) {
  return (
    <TextField className={className} {...textFieldProps}>
      <Label>{label}</Label>
      {description && <Description>{description}</Description>}
      <Input {...inputProps} />
      {error && <FieldError>{error}</FieldError>}
    </TextField>
  );
}
