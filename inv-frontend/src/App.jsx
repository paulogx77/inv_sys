import { useState, useEffect } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  

function App() {
  const [produtos, setProdutos] = useState([]);
  const [produtoParaEditar, setProdutoParaEditar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Função para buscar todos os produtos da API
  const fetchProdutos = () => {
    fetch('http://localhost:8080/api/produtos')
      .then(response => response.json())
      .then(data => setProdutos(data))
      .catch(error => console.error('Erro ao buscar produtos:', error));
  };

  // Busca os produtos quando o componente é montado pela primeira vez
  useEffect(() => {
    fetchProdutos();
  }, []);

  // Função que será passada para o ProductForm
  const handleProdutoAdicionado = async (novoProduto) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoProduto),
      });
      const produtoSalvo = await response.json();

      if (response.ok) {
        setProdutos(produtosAtuais => [...produtosAtuais, produtoSalvo]);
        toast.success('Produto adicionado com sucesso!');
        return true; // Retorna true para o formulário saber que pode limpar os campos
      } else {
        // Assume que a resposta de erro tem um formato { "campo": "mensagem" }
        const errorData = produtoSalvo;
        const errorMessage = Object.values(errorData).join(', ');
        toast.error(`Erro ao adicionar produto: ${errorMessage}`);
        return false;
      }
    } catch (error) {
      toast.error('Erro de conexão ao adicionar produto.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletarProduto = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/produtos/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setProdutos(produtosAtuais => produtosAtuais.filter(produto => produto.id !== id));
        toast.success('Produto deletado com sucesso!');
      } else {
        toast.error('Falha ao deletar o produto.');
      }
    } catch (error) {
      toast.error('Erro de conexão ao deletar produto.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleProdutoAtualizado = async (id, produtoAtualizado) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/produtos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produtoAtualizado),
      });
      const data = await response.json();
      if (response.ok) {
        setProdutos(produtosAtuais => 
          produtosAtuais.map(p => (p.id === id ? data : p))
        );
        setProdutoParaEditar(null);
        toast.success('Produto atualizado com sucesso!');
      } else {
        const errorData = data;
        const errorMessage = Object.values(errorData).join(', ');
        toast.error(`Erro ao atualizar produto: ${errorMessage}`);
      }
    } catch (error) {
      toast.error('Erro de conexão ao atualizar produto.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelecionarParaEditar = (produto) => {
    setProdutoParaEditar(produto);
  };
  
  const handleCancelarEdicao = () => {
    setProdutoParaEditar(null);
  };
  
  
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={3000} // Fecha a notificação após 3 segundos
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <header className="App-header">
        <h1>Sistema de Inventário</h1>
        
        <ProductForm 
          onProdutoAdicionado={handleProdutoAdicionado}
          produtoParaEditar={produtoParaEditar}
          onProdutoAtualizado={handleProdutoAtualizado}
          onCancelarEdicao={handleCancelarEdicao}
          isLoading={isLoading} 
        />
        
        <hr />

        <ProductList 
          produtos={produtos} 
          onDeletarProduto={handleDeletarProduto} 
          onEditar={handleSelecionarParaEditar}
          isLoading={isLoading} 
        />
      </header>
    </div>
  );
}

export default App;