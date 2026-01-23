import ContactForm from "@/src/ui/ContactForm";

export default function ContactosPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      {/* Cabeçalho da página */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">Contactos</h1>
        <p className="text-lg text-gray-600">
          Tem alguma dúvida ou deseja saber mais sobre o StockFlow?
          <br />
          Entre em contacto connosco.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Formulário */}
        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-semibold text-gray-900">
            Envie-nos uma mensagem
          </h2>
          <ContactForm />
        </div>

        {/* Informações de contacto */}
        <div className="flex flex-col gap-6">
          <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">
              Informações de Contacto
            </h2>
            
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-2xl">
                  📧
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <a 
                    href="mailto:contacto@stockflow.com"
                    className="text-blue-600 hover:underline"
                  >
                    contacto@stockflow.com
                  </a>
                </div>
              </div>

              {/* Localização */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-2xl">
                  📍
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Localização</h3>
                  <p className="text-gray-600">Lisboa, Portugal</p>
                </div>
              </div>
            </div>
          </div>

          {/* Informação adicional */}
          <div className="rounded-lg bg-blue-50 p-6">
            <h3 className="mb-2 font-semibold text-blue-900">
              Horário de Atendimento
            </h3>
            <p className="text-sm text-blue-800">
              Segunda a Sexta: 9h00 - 18h00
              <br />
              Respondemos normalmente em até 24 horas úteis.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}