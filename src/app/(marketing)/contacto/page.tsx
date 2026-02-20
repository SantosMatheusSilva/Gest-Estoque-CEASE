import ContactForm from "@/src/ui/Contacto/ContactForm";

export default function ContactosPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 justify-center">
      {/* Cabeçalho */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">Contactos</h1>
        <p className="text-lg text-gray-600">
          Tem alguma dúvida ou deseja saber mais sobre o StockFlow?
          <br />
          Entre em contacto connosco.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Formulário de contacto */}
        <div className="rounded-lg border bg-white p-8 shadow-sm justify-center items-center">
          <h2 className="mb-6 text-2xl font-semibold">
            Envie-nos uma mensagem
          </h2>
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
