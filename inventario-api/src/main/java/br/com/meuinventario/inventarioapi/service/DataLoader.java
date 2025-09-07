package br.com.meuinventario.inventarioapi.service;

import br.com.meuinventario.inventarioapi.model.Usuario;
import br.com.meuinventario.inventarioapi.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Verifica se o usuário 'admin' já existe
        if (usuarioRepository.findByUsername("admin").isEmpty()) {
            Usuario admin = new Usuario();
            admin.setUsername("admin");
            // Codifica a senha antes de salvar!
            admin.setPassword(passwordEncoder.encode("password"));

            usuarioRepository.save(admin);
            System.out.println(">>> Usuário 'admin' criado com senha 'password'");
        }
    }
}