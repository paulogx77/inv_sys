package br.com.meuinventario.inventarioapi.exception;

import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // 2. Este metodo será chamado quando um erro de (@Valid) ocorrer

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST) // 3. Define o status HTTP da resposta para 400
    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();

        // 4. Itera sobre todos os erros de campo encontrados
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField(); // Pega o nome do campo
            String errorMessage = error.getDefaultMessage(); // Pega a mensagem que definimos na anotação
            errors.put(fieldName, errorMessage);
        });

        return errors; // Retorna um mapa de [campo] -> [mensagem de erro]
    }

    // Podemos adicionar outros métodos @ExceptionHandler aqui para outros tipos de exceções
}

