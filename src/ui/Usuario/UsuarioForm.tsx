"use client";

import { Input, Button, Label } from "@heroui/react";
import { criarUsuario } from "@/src/lib/actions";

export default function UsuarioForm() {
  return (
    <form action={criarUsuario} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Label>Email</Label>
        <Input
          name="email"
          type="email"
          placeholder="Digite seu email"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label>Senha</Label>
        <Input
          name="senha"
          type="password"
          placeholder="Digite sua senha"
          required
        />
      </div>

      <Button type="submit" variant="primary">
        Criar conta
      </Button>
    </form>
  );
}
