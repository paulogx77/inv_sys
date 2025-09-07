package br.com.meuinventario.inventarioapi.dto;

import br.com.meuinventario.inventarioapi.model.Produto;

public record CriacaoProdutoResponse (
    Produto produto,
    long totalElementos
) {}
