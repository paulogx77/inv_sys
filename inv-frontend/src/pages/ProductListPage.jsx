import { Link, useNavigate } from 'react-router-dom';

import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Button, Box, Typography, IconButton, CircularProgress, Pagination,
  TextField
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


function ProductListPage({ produtos, onDeletarProduto, onEditar, isLoading, totalPages, currentPage, onPageChange, searchTerm,onSearchChange }) {
  const navigate = useNavigate();
  
  const handleEditClick = (produto) => {
    navigate(`/produtos/editar/${produto.id}`);
  };

  return (
    <Paper sx={{ p: 2 }}> 
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>

        <Typography variant="h4" component="h1">
          Lista de Produtos
        </Typography>
        <Button 
          variant="contained" 
          component={Link} // Faz o botão se comportar como um Link do router
          to="/produtos/novo"
        >
          Adicionar Produto
        </Button>
      </Box>

      <Box mb={2}>
        <TextField 
          fullWidth
          variant="outlined"
          label="Buscar por nome do produto"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </Box>

      {isLoading && <Box display="flex" justifyContent="center"><CircularProgress /></Box>}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell align="right">Quantidade</TableCell>
              <TableCell align="right">Preço (R$)</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produtos.map((produto) => (
              <TableRow key={produto.id}>
                <TableCell>{produto.nome}</TableCell>
                <TableCell>{produto.sku}</TableCell>
                <TableCell align="right">{produto.quantidade}</TableCell>
                <TableCell align="right">{produto.preco.toFixed(2)}</TableCell>
                <TableCell align="center">
                  {/* 5. Usamos Ícones nos botões para um visual mais limpo */}
                  <IconButton onClick={() => handleEditClick(produto)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => onDeletarProduto(produto.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" mt={2}>
      
        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={onPageChange}
            color="primary"
            disabled={isLoading}
          />
        )}
      </Box>
    </Paper>
  );
}

export default ProductListPage;