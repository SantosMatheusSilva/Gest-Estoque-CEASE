import {
  Label,
  Select,
  ListBox,
  FieldError,
  TextField,
  TextFieldProps,
} from "@heroui/react";
import React from "react";

interface Option {
  id: string;
  label: string;
}

interface SelectFieldProps extends Omit<TextFieldProps, "children"> {
  label: string;
  description?: string;
  error?: string;
  options: Option[];
  name: string;
  defaultValue?: string;
  required?: boolean;
  onValueChange?: (value: string) => void;
}

export function SelectField({
  label,
  description,
  error,
  options,
  name,
  defaultValue,
  required = false,
  onValueChange,
  ...textFieldProps
}: SelectFieldProps) {
  return (
    <TextField {...textFieldProps}>
      <Label>{label}</Label>
      {description && <p className="text-sm text-gray-500">{description}</p>}

      <Select
        name={name}
        defaultValue={defaultValue}
        isRequired={required}
        aria-invalid={!!error}
        className="w-full"
        onChange={(selectedValue) => {
          onValueChange?.(String(selectedValue));
        }}
      >
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>

        <Select.Popover>
          <ListBox>
            {options.map((opt) => (
              <ListBox.Item key={opt.id} id={opt.id} textValue={opt.label}>
                {opt.label}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>

      {error && <FieldError>{error}</FieldError>}
    </TextField>
  );
}
