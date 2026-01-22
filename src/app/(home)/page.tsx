export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-blue-50 to-white">
      <h1 className="text-5xl font-bold text-gray-900 mb-8 text-center">
        Gestão de Stock Inteligente
      </h1>
      <p className="text-xl text-gray-600 mb-12 max-w-2xl text-center">
        Simplifique o controlo do seu inventário com alertas automáticos e
        interface intuitiva.
      </p>
      <a
        href="/dashboard"
        className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
      >
        Aceder ao Dashboard →
      </a>
    </main>
  );
}
