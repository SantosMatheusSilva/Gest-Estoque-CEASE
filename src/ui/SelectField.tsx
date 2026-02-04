import { Description, Label, ListBox, Select, FieldError } from "@heroui/react";

interface SelectOption {
  id: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  name: string; // 🔑 ESSENCIAL para FormData
  options: SelectOption[];

  description?: string;
  errorMessage?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export function SelectField({
  label,
  name,
  options,
  description,
  errorMessage,
  placeholder = "Selecione uma opção",
  required,
  disabled,
  className,
}: SelectFieldProps) {
  return (
    <Select
      className={className}
      name={name} // ✅ aqui
      isRequired={required}
      isDisabled={disabled}
      placeholder={placeholder}
      isInvalid={!!errorMessage}
    >
      <Label>{label}</Label>

      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>

      <Select.Popover>
        <ListBox>
          {options.map((opt) => (
            <ListBox.Item
              key={opt.id}
              id={opt.id} // 🔑 valor enviado no FormData
              textValue={opt.label}
            >
              {opt.label}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>

      {description && <Description>{description}</Description>}
      {errorMessage && <FieldError>{errorMessage}</FieldError>}
    </Select>
  );
}
