"use client";

import { Input, Textarea, Button } from "@nextui-org/react";
import { useState } from "react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        type="text"
        label="Nome"
        placeholder="Seu nome completo"
        value={formData.name}
        onValueChange={(value) => setFormData({ ...formData, name: value })}
        isRequired
      />

      <Input
        type="email"
        label="Email"
        placeholder="seu@email.com"
        value={formData.email}
        onValueChange={(value) => setFormData({ ...formData, email: value })}
        isRequired
      />

      <Textarea
        label="Mensagem"
        placeholder="Digite sua mensagem"
        value={formData.message}
        onValueChange={(value) => setFormData({ ...formData, message: value })}
        isRequired
        minRows={4}
      />

      <Button type="submit" color="primary">
        Enviar
      </Button>
    </form>
  );
}
