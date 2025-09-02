package br.com.meuinventario.inventarioapi.service;

import br.com.meuinventario.inventarioapi.exception.ResourceNotFoundException;
import br.com.meuinventario.inventarioapi.model.Produto;
import br.com.meuinventario.inventarioapi.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service // 1. Anotação que define esta classe como um componente de serviço do Spring
public class ProdutoService {

    @Autowired // 2. O Serviço agora depende do Repositório
    private ProdutoRepository produtoRepository;

    public List<Produto> listarTodos() {
        return produtoRepository.findAll();
    }

    public Produto buscarPorId(Long id) {
        return produtoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado com o ID: " + id));
    }

    public Produto criar(Produto produto) {
        // Aqui poderíamos adicionar lógicas de negócio, como validar se o SKU já existe.
        return produtoRepository.save(produto);
    }

    public Produto atualizar(Long id, Produto produtoAtualizado) {
        // Primeiro, buscamos o produto para garantir que ele existe
        Produto produtoExistente = buscarPorId(id);

        // Atualizamos os campos do produto existente com os novos dados
        produtoExistente.setNome(produtoAtualizado.getNome());
        produtoExistente.setSku(produtoAtualizado.getSku());
        produtoExistente.setQuantidade(produtoAtualizado.getQuantidade());
        produtoExistente.setPreco(produtoAtualizado.getPreco());

        return produtoRepository.save(produtoExistente);
    }

    public void deletar(Long id) {
        // Verifica se o produto existe antes de deletar
        if (!produtoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Produto não encontrado com o ID: " + id);
        }
        produtoRepository.deleteById(id);
    }
}
