function ProductList({ produtos, onDeletarProduto, onEditar, isLoading }) {
  return (
    <div>
      <h2>Lista de Produtos</h2>
      {produtos.length === 0 ? (
        <p>Nenhum produto cadastrado.</p>
      ) : (
        <ul>
          {produtos.map(produto => (
            <li key={produto.id}>
              {produto.nome} (SKU: {produto.sku}) - Qtd: {produto.quantidade} - R$ {produto.preco.toFixed(2)}
              
              <button onClick={() => onEditar(produto)} disabled={isLoading}>Editar</button>
              <button onClick={() => onDeletarProduto(produto.id)} disabled={isLoading}>Deletar</button>

            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductList;