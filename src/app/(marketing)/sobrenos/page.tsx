import Titulo from "@/src/ui/Sobrenos/Titulo";
import { Texto } from "@/src/ui/Sobrenos/Texto";
import { Imagem } from "@/src/ui/Sobrenos/Imagem";

export default function SobreNosPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 flex flex-col gap-16">
      {/* MISSÃO */}
      <section className="flex flex-col gap-4">
        <Titulo>Missão</Titulo>
        <Texto>
          Simplificar a gestão de estoque para que empresas cresçam com
          controle, clareza e confiança — sem processos complicados.
        </Texto>
      </section>

      {/* PROBLEMA */}
      <section className="flex flex-col gap-4">
        <Titulo>O Problema</Titulo>
        <Texto>
          Planilhas quebradas, controles manuais e informações desencontradas
          fazem empresas perderem tempo, dinheiro e oportunidades todos os dias.
        </Texto>
        <Imagem
          src="/images/problema-estoque.jpg"
          alt="Controle de estoque manual"
        />
      </section>

      {/* SOLUÇÃO */}
      <section className="flex flex-col gap-4">
        <Titulo>A Solução</Titulo>
        <Texto>
          O StockManager reúne todo o controle de estoque em um único sistema
          simples, visual e confiável — ajudando você a tomar decisões melhores,
          mais rápido.
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
          Para negócios que querem sair do improviso e assumir o controle:
          pequenas empresas, lojas físicas, armazéns e startups em crescimento.
        </Texto>
      </section>
    </main>
  );
}
