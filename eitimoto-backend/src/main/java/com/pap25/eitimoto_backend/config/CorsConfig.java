package com.pap25.eitimoto_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Pozwól na dostęp do wszystkich endpointów
                        .allowedOrigins("http://localhost:3000", "http://localhost:5173") // Adresy Twojego Reacta (3000 lub 5173)
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Dozwolone metody HTTP
                        .allowedHeaders("*") // Wszystkie nagłówki
                        .allowCredentials(true); // Pozwól na przesyłanie ciasteczek/poświadczeń
            }
        };
    }
}