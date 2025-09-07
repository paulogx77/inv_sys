import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';

function ProductFormPage({ onProdutoAdicionado, onProdutoAtualizado, produtos }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const produtoParaEditar = isEditing ? produtos.find(p => p.id === Number(id)) : null;

  const handleSuccess = () => {
    navigate('/');
  };

  return (
    <div>
      <ProductForm
        onProdutoAdicionado={onProdutoAdicionado}
        produtoParaEditar={produtoParaEditar}
        onProdutoAtualizado={onProdutoAtualizado}
        onCancelarEdicao={() => navigate('/')}
        onSuccess={handleSuccess}
      />
    </div>
  );
}

export default ProductFormPage;