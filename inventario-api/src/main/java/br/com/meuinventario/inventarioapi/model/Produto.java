package br.com.meuinventario.inventarioapi.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.*;
import lombok.Data;


@Entity
@Data
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank(message = "O nome do produto não pode estar em branco.")
    @Size(min = 3, max = 100, message = "O nome do produto deve ter entre 3 e 100 caracteres.")
    private String nome;

    @NotBlank(message = "O SKU não pode estar em branco.")
    private String sku; // codigo unico do produto | stock keeping unit

    @NotNull(message = "a quantidade não pode ser nula.")
    @PositiveOrZero(message = "A quantidade não pode ser negativa.")
    private int quantidade;

    @NotNull(message = "O preço não pode ser nulo")
    @PositiveOrZero(message = "O preço não pode ser negativo.")
    private double preco;


}
