import { Titulo } from "@/src/ui/Sobrenos/Titulo";
import { Texto } from "@/src/ui/Sobrenos/Texto";
import { Imagem } from "@/src/ui/Sobrenos/Imagem";

export default function SobreNosPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 flex flex-col gap-16">

      {/* MISSÃO */}
      <section className="flex flex-col gap-4">
        <Titulo>Missão</Titulo>
        <Texto>
          Ajudar pequenas e médias empresas a terem controle total do seu
          estoque sem complexidade.
        </Texto>
      </section>

      {/* PROBLEMA */}
      <section className="flex flex-col gap-4">
        <Titulo>O Problema</Titulo>
        <Texto>
          Muitas empresas ainda controlam estoque com planilhas desatualizadas,
          processos manuais e falta de visibilidade em tempo real.
        </Texto>
        <Imagem
          src="/images/problema-estoque.png"
          alt="Controle de estoque manual"
        />
      </section>

      {/* SOLUÇÃO */}
      <section className="flex flex-col gap-4">
        <Titulo>A Solução</Titulo>
        <Texto>
          O StockFlow centraliza todas as informações de estoque em um único
          sistema, reduzindo erros e melhorando decisões.
        </Texto>
        <Imagem
          src="/images/solucao-estoque.png"
          alt="Sistema de controle de estoque"
        />
      </section>

      {/* PÚBLICO-ALVO */}
      <section className="flex flex-col gap-4">
        <Titulo>Para quem é?</Titulo>
        <Texto>
          Pequenos negócios, lojas físicas, armazéns e startups em crescimento.
        </Texto>
      </section>

    </main>
  );
}
