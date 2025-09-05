import { useState, useEffect } from 'react';

// Agora o formulário recebe o produto para editar e uma função para cancelar
function ProductForm({ onProdutoAdicionado, produtoParaEditar, onProdutoAtualizado, onCancelarEdicao, isLoading }) {
  const [nome, setNome] = useState('');
  const [sku, setSku] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [preco, setPreco] = useState(0.0);

  // Determina se estamos em modo de edição
  const isEditing = produtoParaEditar !== null;

  // useEffect é perfeito para sincronizar o estado do formulário com as props
  useEffect(() => {
    if (isEditing) {
      setNome(produtoParaEditar.nome);
      setSku(produtoParaEditar.sku);
      setQuantidade(produtoParaEditar.quantidade);
      setPreco(produtoParaEditar.preco);
    } else {
      // Limpa o formulário se sairmos do modo de edição
      setNome('');
      setSku('');
      setQuantidade(0);
      setPreco(0.0);
    }
  }, [produtoParaEditar, isEditing]); // Este efeito roda sempre que 'produtoParaEditar' muda

  const handleSubmit = (event) => {
    event.preventDefault();

    const dadosProduto = {
      nome,
      sku,
      quantidade: parseInt(quantidade, 10),
      preco: parseFloat(preco)
    };

    if (isEditing) {
      // Se estiver editando, chama a função de atualização
      onProdutoAtualizado(produtoParaEditar.id, dadosProduto);
    } else {
      // Se estiver criando, chama a função de adição
      fetch('http://localhost:8080/api/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosProduto),
      })
      .then(response => response.json())
      .then(produtoSalvo => {
        onProdutoAdicionado(produtoSalvo);
        setNome(''); setSku(''); setQuantidade(0); setPreco(0.0);
      })
      .catch(error => console.error('Erro ao criar produto:', error));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Editar Produto' : 'Adicionar Novo Produto'}</h2>
      {/* ... campos do formulário*/}
      <div><label>Nome:</label><input type="text" value={nome} onChange={e => setNome(e.target.value)} required /></div>
      <div><label>SKU:</label><input type="text" value={sku} onChange={e => setSku(e.target.value)} required /></div>
      <div><label>Quantidade:</label><input type="number" value={quantidade} onChange={e => setQuantidade(e.target.value)} required /></div>
      <div><label>Preço:</label><input type="number" step="0.01" value={preco} onChange={e => setPreco(e.target.value)} required /></div>
      
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Salvando...' : (isEditing ? 'Salvar Alterações' : 'Adicionar Produto')}
      </button>
      
      {isEditing && (
        <button type="button" onClick={onCancelarEdicao} disabled={isLoading}>
          Cancelar
        </button>
      )}
    </form>
  );
}

export default ProductForm;