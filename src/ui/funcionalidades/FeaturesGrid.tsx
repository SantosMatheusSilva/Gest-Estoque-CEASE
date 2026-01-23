import FeatureCard from "./FeaturesCard";

export default function FeaturesGrid() {
  const features = [
    {
      title: "Gestão de Produtos",
      description: ["Cadastro de produtos", "Categorias e quantidades"],
    },
    {
      title: "Controle de Entradas e Saídas",
      description: ["Registro de movimentações", "Histórico completo"],
    },
    {
      title: "Alertas Inteligentes",
      description: ["Notificação de estoque baixo", "Prevenção de rupturas"],
    },
    {
      title: "Relatórios",
      description: ["Visão geral do inventário", "Dados claros para decisão"],
    },
    {
      title: "Interface Intuitiva",
      description: ["Fácil de usar", "Sem curva de aprendizagem"],
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
}
