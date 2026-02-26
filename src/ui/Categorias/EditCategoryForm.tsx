"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { z } from "zod";
import { TextField, Label, Input, FieldError } from "@heroui/react";
import { Button } from "@/src/ui/Button";
import Surface from "@/src/ui/Surface";
import { CategoriaRaiz } from "@/src/db/definitions";

// Validação do formulário
const categoriaSchema = z.object({
  nome: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(50, "O nome deve ter no máximo 50 caracteres")
    .trim(),
});

export interface EditCategoryFormProps {
  category: CategoriaRaiz;
  onSubmit?: (data: { id_categoria: string; nome: string }) => Promise<void>;
  onCancel?: () => void;
}

export function EditCategoryForm({
  category,
  onSubmit,
  onCancel,
}: EditCategoryFormProps) {
  const [formData, setFormData] = useState({ nome: category.nome });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Foco automático no input
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
      categoriaSchema.parse(formData);
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
          id_categoria: category.id_categoria,
          nome: formData.nome.trim(),
        });
      } catch (err) {
        console.error("Erro ao editar categoria:", err);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, validateForm, onSubmit, category.id_categoria],
  );

  return (
    <Surface className="w-full max-w-md">
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
          <Label>Nome da Categoria</Label>
          <Input
            value={formData.nome}
            onChange={(e) => handleNomeChange(e.target.value)}
            placeholder="Digite o nome da categoria"
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

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { z } from 'zod';
import { TextField, Label, Input, FieldError } from "@heroui/react";
import { Button } from "@/src/ui/Button";
import Surface from "@/src/ui/Surface";

// Zod validation schema
const categoriaSchema = z.object({
  nome: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(50, "O nome deve ter no máximo 50 caracteres")
    .trim(),
});

export interface EditCategoryFormProps {
  category: { id_categoria: string; nome: string };
  nome?: string;
  onNomeChange?: (value: string) => void;
  onCancel?: () => void;
  onSubmit?: (data: { id_categoria: string; nome: string }) => void;
}

export function EditCategoryForm({
  category,
  nome,
  onNomeChange,
  onCancel,
  onSubmit
}: EditCategoryFormProps) {
  const [formData, setFormData] = useState({ 
    nome: nome || category.nome 
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Auto-focus on mount
  useEffect(() => {
    const firstInput = formRef.current?.querySelector('input');
    firstInput?.focus();
  }, []);

  // Sync with props
  useEffect(() => {
    setFormData({ nome: nome || category.nome });
  }, [nome, category.nome]);

  const handleNomeChange = useCallback((value: string) => {
    setFormData({ nome: value });
    onNomeChange?.(value);
    
    // Clear error for this field when user starts typing
    if (errors.nome) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.nome;
        return newErrors;
      });
    }
  }, [errors.nome, onNomeChange]);

  const validateForm = useCallback(() => {
    try {
      categoriaSchema.parse(formData);
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

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await onSubmit?.({
        id_categoria: category.id_categoria,
        nome: formData.nome.trim()
      });
      
      // Form stays populated after edit (no reset for edit forms)
      
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm, onSubmit, category.id_categoria]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isSubmitting) {
      e.preventDefault();
      handleSubmit(e);
    } else if (e.key === 'Escape') {
      onCancel?.();
    }
  }, [handleSubmit, onCancel, isSubmitting]);

  return (
    <Surface className="w-full max-w-md">
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
          <Label>Nome da Categoria</Label>
          <Input 
            value={formData.nome}
            onChange={(e) => handleNomeChange(e.target.value)}
            placeholder="Digite o nome da categoria"
            disabled={isSubmitting}
          />
          <FieldError>{errors.nome}</FieldError>
        </TextField>

        <div className="flex gap-2 mt-6">
          <Button 
            type="submit" 
            variant="primary" 
            isDisabled={isSubmitting}
          >
            {isSubmitting ? "A guardar..." : "Guardar Alterações"}
          </Button>
          {onCancel && (
            <Button 
              type="button" 
              onClick={onCancel}
            >
              Cancelar
            </Button>
          )}
        </div>
      </form>
    </Surface>
  );
} */
