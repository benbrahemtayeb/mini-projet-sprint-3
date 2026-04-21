package com.tayeb.joueurs;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.tayeb.joueurs.entities.Equipe;
import com.tayeb.joueurs.entities.Joueur;

@SpringBootApplication
public class JoueursApplication implements RepositoryRestConfigurer {

	public static void main(String[] args) {
		SpringApplication.run(JoueursApplication.class, args);
	}

	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
	    config.exposeIdsFor(Equipe.class, Joueur.class);
	    cors.addMapping("/**")
	        .allowedOrigins("http://localhost:4200")
	        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
	        .allowedHeaders("*");
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedOrigins("http://localhost:4200")
						.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
						.allowedHeaders("*");
			}
		};
	}
}