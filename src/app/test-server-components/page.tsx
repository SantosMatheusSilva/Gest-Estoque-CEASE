import { 
  fetchAllProdutos,
  adicionarProduto,
} from "@/src/lib/data";

export default async function TestPage() {
  try {
    // 1) LISTAR TODOS OS PRODUTOS (antes de criar)
    const todosProdutos = await fetchAllProdutos();
    
    // 2) CRIAR UM PRODUTO DE TESTE
    const novoProduto = await adicionarProduto({
      nome: "iPhone 15 Pro - Teste",
      quantidade: 5,
      preco: 999.99,
      id_categoria: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
      adicionado_por: "11111111-1111-1111-1111-111111111111",
    });

    // 3) LISTAR TODOS OS PRODUTOS NOVAMENTE (depois de criar)
    const todosProdutosApos = await fetchAllProdutos();

    return (
      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-blue-600">📊 Test Server Components</h1>
        
        <section className="mb-8 p-6 border-4 border-blue-500 rounded bg-blue-50">
          <h2 className="text-2xl font-bold mb-4">Produtos ANTES: {todosProdutos.length}</h2>
          <pre className="bg-gray-800 text-green-400 p-4 overflow-auto rounded text-sm">
            {JSON.stringify(todosProdutos, null, 2)}
          </pre>
        </section>

        <section className="mb-8 p-6 border-4 border-green-500 rounded bg-green-50">
          <h2 className="text-2xl font-bold mb-4">✅ Novo Produto Criado</h2>
          <pre className="bg-gray-800 text-green-400 p-4 overflow-auto rounded text-sm">
            {JSON.stringify(novoProduto, null, 2)}
          </pre>
        </section>

        <section className="p-6 border-4 border-purple-500 rounded bg-purple-50">
          <h2 className="text-2xl font-bold mb-4">Produtos DEPOIS: {todosProdutosApos.length}</h2>
          <pre className="bg-gray-800 text-green-400 p-4 overflow-auto rounded text-sm">
            {JSON.stringify(todosProdutosApos, null, 2)}
          </pre>
        </section>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-8 bg-red-100 text-red-700 rounded border-4 border-red-500">
        <h1 className="text-3xl font-bold mb-4">❌ Erro</h1>
        <pre className="bg-red-900 text-white p-4 rounded overflow-auto">
          {error instanceof Error ? error.message : String(error)}
        </pre>
      </div>
    );
  }
}