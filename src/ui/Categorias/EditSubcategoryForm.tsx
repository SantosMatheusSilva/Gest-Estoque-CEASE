"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { z } from "zod";
import { TextField, Label, Input, FieldError } from "@heroui/react";
import { Button } from "@/src/ui/Button";
import Surface from "@/src/ui/Surface";
import { SubCategoria } from "@/src/db/definitions";

// Validação do formulário
const subcategoriaSchema = z.object({
  nome: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(50, "O nome deve ter no máximo 50 caracteres")
    .trim(),
});

export interface EditSubcategoryFormProps {
  subcategory: SubCategoria;
  orgId: string;
  onSubmit?: (data: { id_categoria: string; nome: string }) => Promise<void>;
  onCancel?: () => void;
}

export function EditSubcategoryForm({
  subcategory,
  orgId,
  onSubmit,
  onCancel,
}: EditSubcategoryFormProps) {
  const [formData, setFormData] = useState({ nome: subcategory.nome });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    formRef.current?.querySelector("input")?.focus();
  }, []);

  const handleNomeChange = useCallback(
    (value: string) => {
      setFormData({ nome: value });
      if (errors.nome) {
        setErrors((prev) => {
          const copy = { ...prev };
          delete copy.nome;
          return copy;
        });
      }
    },
    [errors.nome],
  );

  const validateForm = useCallback(() => {
    try {
      subcategoriaSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          if (issue.path.length > 0)
            newErrors[issue.path[0] as string] = issue.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  }, [formData]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateForm()) return;

      setIsSubmitting(true);
      try {
        await onSubmit?.({
          id_categoria: subcategory.id_categoria,
          nome: formData.nome.trim(),
        });
      } catch (err) {
        console.error("Erro ao editar subcategoria:", err);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, validateForm, onSubmit, subcategory.id_categoria],
  );

  return (
    <Surface className="w-full max-w-sm">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <TextField
          name="nome"
          isRequired
          value={formData.nome}
          onChange={handleNomeChange}
        >
          <Label>Nome da Subcategoria</Label>
          <Input
            value={formData.nome}
            onChange={(e) => handleNomeChange(e.target.value)}
            placeholder="Digite o nome da subcategoria"
            disabled={isSubmitting}
          />
          <FieldError>{errors.nome}</FieldError>
        </TextField>

        <div className="flex gap-2 mt-4">
          <Button type="submit" variant="primary" isDisabled={isSubmitting}>
            {isSubmitting ? "A guardar..." : "Guardar Alterações"}
          </Button>
          {onCancel && (
            <Button type="button" onClick={onCancel}>
              Cancelar
            </Button>
          )}
        </div>
      </form>
    </Surface>
  );
}

/* "use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { z } from "zod";
import { TextField, Label, Input, FieldError } from "@heroui/react";
import { Button } from "@/src/ui/Button";
import FormSurface from "@/src/ui/Surface";
import Form from "next/form";

// Zod validation schema
const subcategoriaSchema = z.object({
  nome: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(50, "O nome deve ter no máximo 50 caracteres")
    .trim(),
  parent_id: z.string().uuid("ID de categoria inválido"),
});

export interface EditSubcategoryFormProps {
  subcategory: { id_categoria: string; nome: string; parent_id: string };
  parentCategories: Array<{ id_categoria: string; nome: string }>;
  nome?: string;
  parent_id?: string;
  onNomeChange?: (value: string) => void;
  onParentChange?: (value: string) => void;
  onCancel?: () => void;
  onSubmit?: (data: {
    id_categoria: string;
    nome: string;
    parent_id: string;
  }) => void;
}

export function EditSubcategoryForm({
  subcategory,
  parentCategories,
  nome,
  parent_id,
  onNomeChange,
  onParentChange,
  onCancel,
  onSubmit,
}: EditSubcategoryFormProps) {
  const [formData, setFormData] = useState({
    nome: nome || subcategory.nome,
    parent_id: parent_id || subcategory.parent_id,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Filter out current subcategory from parent categories to prevent self-reference
  const availableParentCategories = parentCategories.filter(
    (cat) => cat.id_categoria !== subcategory.id_categoria,
  );

  // Auto-focus on mount
  useEffect(() => {
    const firstInput = formRef.current?.querySelector("input");
    firstInput?.focus();
  }, []);

  // Sync with props
  useEffect(() => {
    setFormData({
      nome: nome || subcategory.nome,
      parent_id: parent_id || subcategory.parent_id,
    });
  }, [nome, parent_id, subcategory.nome, subcategory.parent_id]);

  const handleNomeChange = useCallback(
    (value: string) => {
      const newFormData = { ...formData, nome: value };
      setFormData(newFormData);
      onNomeChange?.(value);

      // Clear error for this field when user starts typing
      if (errors.nome) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.nome;
          return newErrors;
        });
      }
    },
    [formData, errors.nome, onNomeChange],
  );

  const handleParentChange = useCallback(
    (value: string) => {
      const newFormData = { ...formData, parent_id: value };
      setFormData(newFormData);
      onParentChange?.(value);

      // Clear error for this field when user changes selection
      if (errors.parent_id) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.parent_id;
          return newErrors;
        });
      }
    },
    [formData, errors.parent_id, onParentChange],
  );

  const validateForm = useCallback(() => {
    try {
      subcategoriaSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((err: z.ZodIssue) => {
          if (err.path.length > 0) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  }, [formData]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) return;

      setIsSubmitting(true);

      try {
        await onSubmit?.({
          id_categoria: subcategory.id_categoria,
          nome: formData.nome.trim(),
          parent_id: formData.parent_id,
        });

        // Form stays populated after edit (no reset for edit forms)
      } catch (error) {
        console.error("Form submission error:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, validateForm, onSubmit, subcategory.id_categoria],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !isSubmitting) {
        e.preventDefault();
        handleSubmit(e);
      } else if (e.key === "Escape") {
        onCancel?.();
      }
    },
    [handleSubmit, onCancel, isSubmitting],
  );

  return (
    <FormSurface title="Editar Categoria" variant="secondary">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
        className="flex flex-col gap-4"
      >
        <TextField
          name="nome"
          isRequired
          value={formData.nome}
          onChange={handleNomeChange}
          isDisabled={isSubmitting}
        >
          <Label>Nome da Subcategoria</Label>
          <Input
            value={formData.nome}
            onChange={(e) => handleNomeChange(e.target.value)}
            placeholder="Digite o nome da subcategoria"
            disabled={isSubmitting}
          />
          <FieldError>{errors.nome}</FieldError>
        </TextField>

        <div className="flex flex-col gap-1">
          <Label htmlFor="parent_id">Categoria Pai *</Label>
          <select
            id="parent_id"
            name="parent_id"
            value={formData.parent_id}
            onChange={(e) => handleParentChange(e.target.value)}
            disabled={isSubmitting}
            required
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          >
            {availableParentCategories.map((category) => (
              <option key={category.id_categoria} value={category.id_categoria}>
                {category.nome}
              </option>
            ))}
          </select>
          {errors.parent_id && (
            <div className="text-red-500 text-sm">{errors.parent_id}</div>
          )}
        </div>

        <div className="flex gap-2 mt-6">
          <Button type="submit" variant="primary" isDisabled={isSubmitting}>
            {isSubmitting ? "A guardar..." : "Guardar Alterações"}
          </Button>
          {onCancel && (
            <Button type="button" onClick={onCancel}>
              Cancelar
            </Button>
          )}
        </div>
      </form>
    </FormSurface>
  );
}
 */
