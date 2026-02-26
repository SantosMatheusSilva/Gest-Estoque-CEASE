// src/ui/Categorias/CreateCategoryForm.tsx
"use client";

import { Button } from "@/src/ui/Button";
import FormSurface from "@/src/ui/Surface";
// Alterado: Usar form normal para Server Actions com estado
import { InputField } from "../InputField";
import { Modal } from "@heroui/react";
import { IconButton } from "@/src/ui/IconButton";
import { Plus } from "@gravity-ui/icons";

import { createCategoriaAction, CreateCategoriaState } from "@/src/lib/categoriaActions";
import { useActionState, useEffect } from "react";

export function CreateCategoryForm() {
  const initialState: CreateCategoriaState = { message: null, errors: {} };

  // State capturado da Server Action
  const [state, formAction, isPending] = useActionState(
    createCategoriaAction,
    initialState,
  );

  return (
    <Modal>
      {/* Gatilho do Modal */}
      <IconButton startIcon={<Plus />}>Adicionar Categoria</IconButton>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Criar Categoria</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
                Preencha o formulário abaixo.
              </p>
            </Modal.Header>

            <Modal.Body className="p-6">
              <FormSurface variant="default">
                {/* 1. Usar tag form padrão. 2. Passar a action do hook */}
                <form action={formAction} id="create-category">
                  <InputField
                    label="Nome"
                    description="Digite o nome da categoria"
                    // Garante que o name="nome" coincide com o Zod no actions.ts
                    inputProps={{
                      id: "nome",
                      name: "nome",
                      type: "text",
                      required: true,
                    }}
                  />
                  {/* Mostrar erros de validação vindos do servidor */}
                  {state?.errors?.nome && (
                    <p className="text-red-500 text-xs mt-1">
                      {state.errors.nome[0]}
                    </p>
                  )}
                  {state?.message && !state.errors && (
                    <p className="text-red-500 text-xs mt-1">{state.message}</p>
                  )}
                </form>
              </FormSurface>
            </Modal.Body>

            <Modal.Footer>
              <Button slot="close" variant="secondary">
                Cancelar
              </Button>
              {/* Botão de submissão */}
              <Button
                type="submit"
                form="create-category"
                isDisabled={isPending}
              >
                {isPending ? "A criar..." : "Criar"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
//   const CreateInvoice = FormSchema.omit({ id: true, date: true });

// export type State = {
//   errors?: {
//     customerId?: string[];
//     amount?: string[];
//     status?: string[];
//   };
//   message?: string | null;
//   };

//   return (
//     <FormSurface title="Create Category" variant="secondary">
//       <Form action={""}>
//         <InputField
//           name="nome"
//           label="Nome da Categoria"
//           //placeholder="Digite o nome da categoria"
//           isRequired
//         />
//         <div className="flex gap-2 mt-6">
//           <Button type="submit" variant="primary">
//             Criar Categoria
//           </Button>
//           <Button type="button" variant="danger">
//             Cancelar
//           </Button>
//         </div>
//       </Form>
//     </FormSurface>
//   );
// }
// export { CreateCategoryForm };

/* // Zod validation schema
const categoriaSchema = z.object({
  nome: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(50, "O nome deve ter no máximo 50 caracteres")
    .trim(),
});

export interface CreateCategoryFormProps {
  nome?: string;
  onNomeChange?: (value: string) => void;
  onCancel?: () => void;
  onSubmit?: (data: { nome: string; adicionado_por: string }) => void;
}

export function CreateCategoryForm({
  nome = "",
  onNomeChange,
  onCancel,
  onSubmit,
}: CreateCategoryFormProps) {
  const [formData, setFormData] = useState({ nome });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Auto-focus on mount
  useEffect(() => {
    const firstInput = formRef.current?.querySelector("input");
    firstInput?.focus();
  }, []);

  // Sync with props
  useEffect(() => {
    setFormData({ nome });
  }, [nome]);

  const handleNomeChange = useCallback(
    (value: string) => {
      setFormData({ nome: value });
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
    [errors.nome, onNomeChange],
  );

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

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) return;

      setIsSubmitting(true);

      try {
        // Future: will include user ID from authentication
        await onSubmit?.({
          nome: formData.nome.trim(),
          adicionado_por: "current_user_id", // Placeholder for future Clerk session
        });

        // Reset form on success
        setFormData({ nome: "" });
        onNomeChange?.("");
      } catch (error) {
        console.error("Form submission error:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, validateForm, onSubmit, onNomeChange],
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
    <FormSurface variant="secondary" title="Create Category">
      <Form action={""}>
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
          <Button type="submit" variant="primary" isDisabled={isSubmitting}>
            {isSubmitting ? "A criar..." : "Criar Categoria"}
          </Button>
          {onCancel && (
            <Button type="button" onClick={onCancel}>
              Cancelar
            </Button>
          )}
        </div>
      </Form>
    </FormSurface>
  );
} */
