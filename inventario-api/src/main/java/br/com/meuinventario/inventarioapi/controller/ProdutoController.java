package br.com.meuinventario.inventarioapi.controller;

import br.com.meuinventario.inventarioapi.model.Produto;
import br.com.meuinventario.inventarioapi.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/produtos") // Todas requisicoes para esta classe comecarao com /api/produtos
public class ProdutoController {

    @Autowired
    private ProdutoRepository produtoRepository;

    // Endpoint para listar todos os produtos 'localhost:8080/api/produtos
    @GetMapping
    public List<Produto> listarTodos() {
        return produtoRepository.findAll();
    }
    //Endpoint para criar um produto
    @PostMapping
    public ResponseEntity<Produto> criar(@RequestBody Produto produto) {
        Produto produtoSalvo = produtoRepository.save(produto);
        return new ResponseEntity<>(produtoSalvo, HttpStatus.CREATED);
    }
        
    @GetMapping("/{id}")
    public ResponseEntity<Produto> buscaPorId(@PathVariable Long id) {
        Optional<Produto> produtoOpt = produtoRepository.findById(id);

        if (produtoOpt.isPresent()) {
            return ResponseEntity.ok(produtoOpt.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> atualizar(@PathVariable Long id, @RequestBody Produto produtoAtualizado) {
        if (!produtoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        produtoAtualizado.setId(id);
        Produto produtoSalvo = produtoRepository.save(produtoAtualizado);
        return ResponseEntity.ok(produtoSalvo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (!produtoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        produtoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
