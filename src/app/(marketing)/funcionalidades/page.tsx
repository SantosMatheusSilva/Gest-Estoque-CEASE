import FeatureIntro from "@/src/ui/funcionalidades/FeaturesIntro";
import FeaturesGrid from "@/src/ui/funcionalidades/FeaturesGrid";
import Titulo from "@/src/ui/Sobrenos/Titulo";

export default function FuncPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 flex flex-col gap-16 h-svh">
      <section className="flex flex-col gap-4">
        <Titulo>Funcionalidades</Titulo>
        <FeatureIntro />
      </section>
      <section>
        <FeaturesGrid />
      </section>
    </main>
  );
}
