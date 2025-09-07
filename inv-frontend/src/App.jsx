import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { Container, CssBaseline, Box } from '@mui/material';

import ProductListPage from './pages/ProductListPage';
import ProductFormPage from './pages/ProductFormPage';


function App() {
  const [produtos, setProdutos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);  
  const ITENS_POR_PAGINA = 10;

   const [searchTerm, setSearchTerm] = useState('');


  // Função para buscar todos os produtos da API
  const fetchProdutos = async (page = 0, search = '') => { // Adicionado 'search'
  setIsLoading(true);
  try {
    // Constrói a URL dinamicamente
    const url = new URL('http://localhost:8080/api/produtos');
    url.searchParams.append('page', page);
    url.searchParams.append('size', ITENS_POR_PAGINA);
    if (search) { 
      url.searchParams.append('search', search);
    }
    
    const response = await fetch(url.toString());
    const data = await response.json();
    
    setProdutos(data.content);
    setTotalPages(data.totalPages);
    
  } catch (error) {
    toast.error('Erro ao buscar produtos.');
  } finally {
    setIsLoading(false);
  }
};

  useEffect(() => {
    fetchProdutos(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    setCurrentPage(0);
};

  const handleProdutoAdicionado = async (novoProduto) => {
  setIsLoading(true);
  try {
    const response = await fetch('http://localhost:8080/api/produtos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoProduto),
    });
    
    const responseData = await response.json();

    if (response.ok) {
      toast.success('Produto adicionado com sucesso!');
      
      const totalElementos = responseData.totalElementos;
      
      const ultimaPaginaIndex = Math.ceil(totalElementos / ITENS_POR_PAGINA) - 1;

      if (currentPage !== ultimaPaginaIndex) {
        setCurrentPage(ultimaPaginaIndex);
      } else {
        fetchProdutos(ultimaPaginaIndex, searchTerm);
      }
      
      return true;
    } else {
      const errorData = responseData;
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
        toast.success('Produto atualizado com sucesso!');
        console.log("App.jsx: handleProdutoAtualizado retornando TRUE");
        return true;
      } else {
        const errorData = data;
        const errorMessage = Object.values(errorData).join(', ');
        toast.error(`Erro ao atualizar produto: ${errorMessage}`);
        return false;
      }
    } catch (error) {
      toast.error('Erro de conexão ao atualizar produto.');
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
      toast.success('Produto deletado com sucesso!');
      
        if (produtos.length === 1 && currentPage > 0) {
          const paginaAnterior = currentPage - 1;
          setCurrentPage(paginaAnterior); 

        } else {
          fetchProdutos(currentPage, searchTerm);
        }
      
    } else {
      toast.error('Falha ao deletar o produto.');
    }
    } catch (error) {
      toast.error('Erro de conexão ao deletar produto.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (event, newPage) => {
    const pageIndex = newPage - 1;
    setCurrentPage(pageIndex);
  };

  const navigate = useNavigate();

  const handleEditar = (produto) => {
    navigate(`/produtos/editar/${produto.id}`);
  };
  
  
  return (
    <>
      <CssBaseline /> 
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <Container maxWidth="lg"> 
        <Box sx={{ my: 4 }}> 
          <Routes>
          <Route 
            path="/" 
            element={
              <ProductListPage 
                produtos={produtos} 
                onDeletarProduto={handleDeletarProduto}
                onEditar={handleEditar}
                isLoading={isLoading}
                totalPages={totalPages}
                currentPage={currentPage + 1}
                onPageChange={handlePageChange}
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
              />
            } 
          />
          <Route 
            path="/produtos/novo" 
            element={
              <ProductFormPage 
                onProdutoAdicionado={handleProdutoAdicionado}
                produtos={produtos}
              />
            } 
          />
          <Route 
            path="/produtos/editar/:id" 
            element={
              <ProductFormPage 
                onProdutoAtualizado={handleProdutoAtualizado}
                produtos={produtos}
              />
            } 
          />
        </Routes>
        </Box>
      </Container>
    </>
  );
}

export default App;