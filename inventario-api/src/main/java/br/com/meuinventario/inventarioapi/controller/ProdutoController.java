package br.com.meuinventario.inventarioapi.controller;

import br.com.meuinventario.inventarioapi.dto.CriacaoProdutoResponse;
import br.com.meuinventario.inventarioapi.model.Produto;
import br.com.meuinventario.inventarioapi.service.ProdutoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @PostMapping
    public ResponseEntity<CriacaoProdutoResponse> criar(@Valid @RequestBody Produto produto) {
       CriacaoProdutoResponse response = produtoService.criar(produto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public Page<Produto> listarTodos(
            @RequestParam(value = "search", required = false) String termoBusca,
            Pageable pageable) {

        System.out.println("--- CONTROLLER ---");
        System.out.println("Termo de Busca Recebido: " + termoBusca);
        System.out.println("Pageable Recebido: " + pageable);

        return produtoService.listarTodos(termoBusca, pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> buscarPorId(@PathVariable Long id) {
        Produto produto = produtoService.buscarPorId(id);
        return ResponseEntity.ok(produto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> atualizar(@PathVariable Long id, @Valid @RequestBody Produto produtoAtualizado) {
        Produto produto = produtoService.atualizar(id, produtoAtualizado);
        return ResponseEntity.ok(produto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        produtoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}