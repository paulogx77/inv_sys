package br.com.meuinventario.inventarioapi.repository;

import br.com.meuinventario.inventarioapi.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> { }
