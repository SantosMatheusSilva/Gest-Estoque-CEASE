import { Accordion } from "@heroui/react";

export default function faqAccordion() {
  const items = [
    {
      content:
        "É um sistema de gestão de estoque pensado para empresas que querem simplicidade e eficiência.",
      icon: {},
      title: "O que é o StockManager?",
    },
    {
      content: "Não. O sistema foi desenhado para qualquer utilizador.",
      icon: {},
      title: "Preciso de conhecimento técnico para usar?",
    },
    {
      content: "Não. O sistema foi desenhado para qualquer utilizador.",
      icon: {},
      title: "Posso acessar de qualquer dispositivo?",
    },
    {
      content: "Sim. Segurança e integridade dos dados são prioridades.",
      icon: {},
      title: "O sistema é seguro?",
    },
    {
      content: "Este projeto foi desenvolvido com fins académicos.",
      icon: {},
      title: "Este produto é real?",
    },
  ];
  return (
    <Accordion
      className="w-full max-w-md rounded-2xl text-black"
      variant="surface"
    >
      {items.map((item, index) => (
        <Accordion.Item key={index}>
          <Accordion.Heading>
            <Accordion.Trigger>
              {/* {item.icon ? (
                <span className="mr-3 size-4 shrink-0 text-muted">{item.icon}</span>
              ) : null} */}
              {item.title}
              <Accordion.Indicator>{/* <ChevronDown /> */}</Accordion.Indicator>
            </Accordion.Trigger>
          </Accordion.Heading>
          <Accordion.Panel>
            <Accordion.Body>{item.content}</Accordion.Body>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
