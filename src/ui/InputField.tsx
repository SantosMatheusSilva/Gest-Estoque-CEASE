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
import {
  Description,
  Input,
  Label,
  TextField,
  FieldError,
  TextFieldProps,
  InputProps,
} from "@heroui/react";

interface InputFieldProps {
  label: string;
  description?: string;
  errorMessage?: string;
  className?: string;

  textFieldProps?: TextFieldProps;
  inputProps?: InputProps;
}

export function InputField({
  label,
  description,
  errorMessage,
  className,
  textFieldProps,
  inputProps,
}: InputFieldProps) {
  return (
    <TextField className={className} {...textFieldProps}>
      <Label>{label}</Label>

      {description && <Description>{description}</Description>}

      <Input {...inputProps} />

      {errorMessage && <FieldError>{errorMessage}</FieldError>}
    </TextField>
  );
}
