import { PageLayout } from "@/src/ui/PageLayout";

export default function PerfilPage() {
  return (
    <PageLayout
      title="Perfil do Utilizador"
      description="Gerencie as informações do seu perfil"
    >
      <div className="space-y-6">
        <div className="bg-surface rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Informações Pessoais</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground-700 mb-1">
                Nome Completo
              </label>
              <p className="text-foreground">João Silva</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground-700 mb-1">
                Email
              </label>
              <p className="text-foreground">joao.silva@empresa.pt</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground-700 mb-1">
                Função
              </label>
              <p className="text-foreground">Administrador</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground-700 mb-1">
                Data de Criação
              </label>
              <p className="text-foreground">01/01/2024</p>
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Definições da Conta</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Notificações por Email</h4>
                <p className="text-sm text-foreground-500">
                  Receber alertas de stock baixo por email
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Relatórios Semanais</h4>
                <p className="text-sm text-foreground-500">
                  Enviar resumo semanal de atividades
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}