// import Footer from '@/components/footer';
export default function Home() {
  return (
    <>
      <div 
        className="h-screen bg-cover bg-center bg-no-repeat bg-fixed relative"
        style={{ backgroundImage: `url('/stock.jpg')` }}
      >
        <div className="absolute inset-0 bg-black/60 z-0" />
        
        <section className="h-screen flex flex-col items-center justify-center px-8 text-center text-white relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Gestão de Stock Inteligente
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl">
            Evita quebras, reduz desperdício e acompanha o inventário da tua empresa
            em tempo real – tudo num único painel simples.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <a
              href="/dashboard"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold"
            >
              Aceder ao Dashboard
            </a>
            <a
              href="/funcionalidades"
              className="bg-transparent border border-white/60 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-semibold"
            >
              Ver Funcionalidades
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl w-full">
            <div className="bg-black/40 rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-2">Alertas de stock baixo</h3>
              <p className="text-sm text-gray-300">
                Sabe exatamente quando e o que precisas de repor.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-2">Visão em tempo real</h3>
              <p className="text-sm text-gray-300">
                Acompanha entradas e saídas de produtos num só ecrã.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-2">Simples de usar</h3>
              <p className="text-sm text-gray-300">
                Interface pensada para equipas de armazém e gestores.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

