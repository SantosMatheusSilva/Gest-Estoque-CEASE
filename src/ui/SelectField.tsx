import React from "react";

interface SelectFieldProps {
  label: string;
  name: string;
  required?: boolean;
  options: { id: string; label: string }[];
  error?: string;
}

export function SelectField({ 
  label, 
  name, 
  required, 
  options, 
  error 
}: SelectFieldProps) {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select 
        name={name} 
        id={name} 
        required={required} 
        className="form-control"
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${name}-error` : undefined}
      >
        <option value="">Selecione...</option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p 
          id={`${name}-error`} 
          className="mt-1 text-sm text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}


