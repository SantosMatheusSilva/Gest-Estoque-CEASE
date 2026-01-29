import { Surface } from "@heroui/react";
import { Texto } from "../Sobrenos/Texto";
import Titulo from "../Sobrenos/Titulo";

export default function FeatureIntro() {
  return (
    <Surface className="p-8 rounded-lg shadow-mdtext-center" variant="default">
      <Titulo className="text-gray-800 text-2xl">
        Gestão de Estoque Simplificada
      </Titulo>
      <Texto className="mt-4 text-gray-900" size="lg">
        O StockManager oferece uma solução intuitiva para monitorar e controlar
        seu inventário, ajudando sua empresa a operar de forma mais eficiente.
      </Texto>
    </Surface>
  );
}
