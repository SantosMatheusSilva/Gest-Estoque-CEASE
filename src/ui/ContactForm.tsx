"use client";

import { Check } from "@gravity-ui/icons";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  TextArea,
} from "@heroui/react";

export default function ContactForm() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Exibir mensagem de sucesso
    alert(
      "✅ Mensagem enviada com sucesso!\n\nEntraremos em contacto em breve.",
    );

    // Limpar o formulário
    e.currentTarget.reset();
  };

  return (
    <Form className="flex w-full flex-col gap-6" onSubmit={onSubmit}>
      {/* Nome */}
      <TextField
        isRequired
        name="name"
        type="text"
        validate={(value) => {
          if (value.length < 3) {
            return "O nome deve ter pelo menos 3 caracteres";
          }
          return null;
        }}
      >
        <Label>Nome</Label>
        <Input placeholder="O seu nome" />
        <FieldError />
      </TextField>

      {/* Email */}
      <TextField
        isRequired
        name="email"
        type="email"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Por favor, insira um email válido";
          }
          return null;
        }}
      >
        <Label>Email</Label>
        <Input placeholder="seuemail@exemplo.com" />
        <FieldError />
      </TextField>

      {/* Assunto */}
      <TextField
        isRequired
        name="subject"
        type="text"
        validate={(value) => {
          if (value.length < 5) {
            return "O assunto deve ter pelo menos 5 caracteres";
          }
          return null;
        }}
      >
        <Label>Assunto</Label>
        <Input placeholder="Qual o motivo do contacto?" />
        <FieldError />
      </TextField>

      {/* Mensagem */}
      <TextField
        isRequired
        name="message"
        validate={(value) => {
          if (value.length < 20) {
            return "A mensagem deve ter pelo menos 20 caracteres";
          }
          return null;
        }}
      >
        <Label>Mensagem</Label>
        <TextArea placeholder="Escreva a sua mensagem aqui..." rows={6} />
        <FieldError />
      </TextField>

      {/* Botão */}
      <Button type="submit" className="w-full sm:w-auto">
        <Check />
        Enviar mensagem
      </Button>
    </Form>
  );
}
