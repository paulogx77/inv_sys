package br.com.meuinventario.inventarioapi.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // 1. Mapeia para todos os endpoints que começam com /api/
                .allowedOrigins("http://localhost:5173") // 2. Permite requisições desta origem
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "TRACE", "CONNECT") // 3. Permite estes métodos HTTP
                .allowedHeaders("*"); // 4. Permite todos os cabeçalhos
    }
}