package br.com.meuinventario.inventarioapi.service;

import br.com.meuinventario.inventarioapi.model.Produto;
import br.com.meuinventario.inventarioapi.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    public List<Produto> listarTodos() {
        return produtoRepository.findAll();
    }
}
