import { fetchCategoriaComSubcategorias } from "@/src/db/data";
import ProductPageLayout from "@/src/ui/Produtos/ProductsPageLayout";
import { CategoriaRaiz } from "@/src/db/definitions";
export default async function ProdutosPage() {
  const categorias: CategoriaRaiz[] = await fetchCategoriaComSubcategorias();

  /* const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    nome: "",
    quantidade: 0,
    preco: 0,
    descricao: "",
    img_url: "",
    id_categoria: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
  });

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    setLoading(true);
    try {
      const data = await fetchAllProdutos();
      setProdutos(data);
    } catch (error) {
      console.error("Erro ao carregar:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNovoClick = () => {
    setEditingId(null);
    setFormData({
      nome: "",
      quantidade: 0,
      preco: 0,
      descricao: "",
      img_url: "",
      id_categoria: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    });
    setShowModal(true);
  };

  const handleEditClick = (produto: Produto) => {
    setEditingId(produto.id);
    setFormData({
      nome: produto.nome,
      quantidade: produto.quantidade,
      preco: parseFloat(produto.preco as any),
      descricao: produto.descricao || "",
      img_url: produto.img_url || "",
      id_categoria: produto.id_categoria,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!formData.nome.trim()) {
      alert("Nome é obrigatório");
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        await editarProduto(editingId, formData);
      } else {
        await adicionarProduto({
          ...formData,
          adicionado_por: "11111111-1111-1111-1111-111111111111",
        });
      }
      await carregarProdutos();
      setShowModal(false);
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao guardar produto");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem a certeza que quer deletar?")) return;

    setDeleting(id);
    try {
      await removerProduto(id);
      await carregarProdutos();
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao deletar produto");
    } finally {
      setDeleting(null);
    }
  }; */

  return (
    <main>
      <ProductPageLayout categorias={categorias} />
      {/* conteudo da pagina */}
      <div></div>
      {/* HEADER */}
      {/*       <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">📦 Produtos</h2>
        <button
          onClick={handleNovoClick}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          ➕ Novo Produto
        </button>
      </div> */}

      {/* LOADING */}
      {/* {loading ? (
        <div className="flex justify-center items-center min-h-96">
          <p className="text-gray-500">A carregar produtos...</p>
        </div>
      ) : produtos.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg">
          <p className="text-gray-500 text-xl mb-4">
            Nenhum produto encontrado
          </p>
          <button
            onClick={handleNovoClick}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            ➕ Criar o primeiro produto
          </button>
        </div>
      ) : (
        <> */}
      {/* GRID */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {produtos.map((produto) => (
              <div
                key={produto.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
              > */}
      {/* IMAGEM */}
      {/* {produto.img_url ? (
                  <img
                    src={produto.img_url}
                    alt={produto.nome}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Sem imagem</span>
                  </div>
                )}
 */}
      {/* CONTENT */}
      {/* <div className="p-4">
                  <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2">
                    {produto.nome}
                  </h3>
                  {produto.descricao && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {produto.descricao}
                    </p>
                  )} */}

      {/* INFO */}
      {/* <div className="grid grid-cols-2 gap-4 mb-4 border-t border-gray-200 pt-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Preço</p>
                      <p className="text-lg font-bold text-teal-600">
                        €{parseFloat(produto.preco as any).toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Stock</p>
                      <p
                        className={`text-lg font-bold ${
                          produto.quantidade > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {produto.quantidade}
                      </p>
                    </div>
                  </div> */}

      {/* BOTÕES */}
      {/*  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(produto)}
                      className="flex-1 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition text-sm font-medium"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(produto.id)}
                      disabled={deleting === produto.id}
                      className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition text-sm font-medium disabled:opacity-50"
                    >
                      {deleting === produto.id ? "..." : "Deletar"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div> */}

      {/* TOTAL */}
      {/*          <div className="p-4 bg-white rounded-lg border border-gray-200 text-center">
            <p className="text-gray-600">
              Total:{" "}
              <span className="font-bold text-lg text-teal-600">
                {produtos.length}
              </span>
            </p>
          </div>
        </>
      )}
 */}
      {/* MODAL */}
      {/* {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">
              {editingId ? "✏️ Editar Produto" : "➕ Novo Produto"}
            </h2>

            <div className="flex flex-col gap-4 mb-6">
              <input
                placeholder="Nome"
                value={formData.nome}
                onChange={(e) =>
                  setFormData({ ...formData, nome: e.target.value })
                }
                className="border border-gray-300 p-3 rounded bg-white text-black"
              />
              <input
                type="number"
                placeholder="Quantidade"
                value={formData.quantidade}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    quantidade: parseInt(e.target.value) || 0,
                  })
                }
                className="border border-gray-300 p-3 rounded bg-white text-black"
              />
              <input
                type="number"
                step="0.01"
                placeholder="Preço (€)"
                value={formData.preco}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    preco: parseFloat(e.target.value) || 0,
                  })
                }
                className="border border-gray-300 p-3 rounded bg-white text-black"
              />
              <input
                placeholder="URL da Imagem"
                value={formData.img_url}
                onChange={(e) =>
                  setFormData({ ...formData, img_url: e.target.value })
                }
                className="border border-gray-300 p-3 rounded bg-white text-black"
              />
              <input
                placeholder="Descrição"
                value={formData.descricao}
                onChange={(e) =>
                  setFormData({ ...formData, descricao: e.target.value })
                }
                className="border border-gray-300 p-3 rounded bg-white text-black"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
              >
                {saving ? "..." : editingId ? "Guardar" : "Criar"}
              </button>
            </div>
          </div>
        </div>
      )} */}
    </main>
  );
}
