import { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Stack } from '@mui/material';


function ProductForm({ onProdutoAdicionado, produtoParaEditar, onProdutoAtualizado, onCancelarEdicao, isLoading, onSuccess }) {
  const [nome, setNome] = useState('');
  const [sku, setSku] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [preco, setPreco] = useState(0.0);

  const isEditing = produtoParaEditar !== null;

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

  const handleSubmit = async (event) => {
  event.preventDefault();

  const dadosProduto = {
    nome,
    sku,
    quantidade: parseInt(quantidade, 10),
    preco: parseFloat(preco)
  };


  let success = false;

  if (isEditing) {
    success = await onProdutoAtualizado(produtoParaEditar.id, dadosProduto);
  } else {

    success = await onProdutoAdicionado(dadosProduto);
  }

  if (success) {
    if (!isEditing) {
      setNome(''); setSku(''); setQuantidade(0); setPreco(0.0);
    }
    onSuccess();
  }
};



  return (
    // 2. Usamos Box em vez de form, o onSubmit vai nele
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography component="h1" variant="h5">
        {isEditing ? 'Editar Produto' : 'Adicionar Novo Produto'}
      </Typography>
      
      {/* 3. Stack organiza os itens em uma coluna com espaçamento */}
      <Stack spacing={2} sx={{ mt: 2 }}>
        <TextField
          label="Nome do Produto"
          variant="outlined"
          fullWidth
          required
          value={nome}
          onChange={e => setNome(e.target.value)}
        />
        <TextField
          label="SKU"
          variant="outlined"
          fullWidth
          required
          value={sku}
          onChange={e => setSku(e.target.value)}
        />
        <TextField
          label="Quantidade"
          type="number"
          variant="outlined"
          fullWidth
          required
          value={quantidade}
          onChange={e => setQuantidade(e.target.value)}
        />
        <TextField
          label="Preço"
          type="number"
          variant="outlined"
          fullWidth
          required
          value={preco}
          onChange={e => setPreco(e.target.value)}
          inputProps={{ step: "0.01" }}
        />
        
        {/* 4. Botões da MUI */}
        <Box>
          <Button
            type="submit"
            variant="contained" // Botão principal
            disabled={isLoading}
            sx={{ mr: 1 }} // Margem à direita
          >
            {isLoading ? 'Salvando...' : (isEditing ? 'Salvar Alterações' : 'Adicionar Produto')}
          </Button>

          {isEditing && (
            <Button 
              variant="outlined" // Botão secundário
              onClick={onCancelarEdicao} 
              disabled={isLoading}
            >
              Cancelar
            </Button>
          )}
        </Box>
      </Stack>
    </Box>
  );
}

export default ProductForm;