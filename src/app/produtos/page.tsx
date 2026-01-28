'use client';
import { useState, useEffect } from 'react';

interface Produto {
  id: number;
  nome: string;
  codigo: string;
  preco: number;
  stockAtual: number;
}

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [novoProduto, setNovoProduto] = useState({
    nome: '',
    codigo: '',
    preco: 0,
    stockAtual: 0
  });

  useEffect(() => {
    fetch('/api/produtos')
      .then(res => res.json())
      .then(setProdutos);
  }, []);

  const adicionarProduto = async () => {
    await fetch('/api/produtos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoProduto)
    });
    const res = await fetch('/api/produtos');
    setProdutos(await res.json());
    setNovoProduto({ nome: '', codigo: '', preco: 0, stockAtual: 0 });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Gestão de Produtos</h1>
      
      <div className="bg-white p-6 rounded-lg mb-8 shadow-md">
        <h2 className="text-xl mb-4 text-gray-800">Adicionar Produto</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <input
            placeholder="Nome"
            value={novoProduto.nome}
            onChange={e => setNovoProduto({...novoProduto, nome: e.target.value})}
            className="border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500 
              bg-white text-black text-lg placeholder-gray-500"
          />
          <input
            placeholder="Código"
            value={novoProduto.codigo}
            onChange={e => setNovoProduto({...novoProduto, codigo: e.target.value})}
            className="border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500 
              bg-white text-black text-lg placeholder-gray-500"
          />
          <input
            type="number"
            placeholder="Preço"
            value={novoProduto.preco}
            onChange={e => setNovoProduto({...novoProduto, preco: Number(e.target.value)})}
            className="border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500 
              bg-white text-black text-lg placeholder-gray-500"
          />
          <input
            type="number"
            placeholder="Stock"
            value={novoProduto.stockAtual}
            onChange={e => setNovoProduto({...novoProduto, stockAtual: Number(e.target.value)})}
            className="border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500 
              bg-white text-black text-lg placeholder-gray-500"
          />
        </div>
        <button
          onClick={adicionarProduto}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Adicionar Produto
        </button>
      </div>

      <div>
        <h2 className="text-xl mb-4 text-gray-800">Lista de Produtos ({produtos.length})</h2>
        <div className="grid gap-4">
          {produtos.map(produto => (
            <div key={produto.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
              <h3 className="font-bold text-lg text-gray-900">{produto.nome}</h3>
              <p className="text-gray-600">Código: {produto.codigo} | Preço: €{produto.preco.toFixed(2)} | Stock: {produto.stockAtual}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

