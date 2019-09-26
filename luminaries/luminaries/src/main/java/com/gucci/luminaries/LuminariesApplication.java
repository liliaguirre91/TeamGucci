package com.gucci.luminaries;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EnableAutoConfiguration
@ComponentScan
public class LuminariesApplication {

	public static void main(String[] args) {
		SpringApplication.run(LuminariesApplication.class, args);
	}

}
