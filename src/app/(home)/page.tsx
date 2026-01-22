// import Footer from '@/components/footer';

export default function HomePage() {
  return (
    <>
      <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('public/stock.jpg')" }}
        >
        <section className="min-h-screen flex flex-col items-center justify-center bg-black bg-opacity-50 px-8 text-center text-white">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
            Gestão de Stock
          </h1>
          <p className="text-2xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
            Controle o seu inventário em tempo real. Alertas automáticos. Interface simples.
          </p>
          <a href="/dashboard" className="inline-block bg-blue-600 text-white px-12 py-6 text-xl font-semibold rounded-2xl hover:bg-blue-700 shadow-2xl transition-all duration-300">
            Aceder Dashboard
          </a>
        </section>
      </div>
    </>
  );
}




