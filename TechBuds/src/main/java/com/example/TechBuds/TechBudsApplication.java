package com.example.TechBuds;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {
		"com.example.TechBuds",
		"com.example.TechBuds.Security",
		"com.example.TechBuds.Services",
		"com.example.TechBuds.Controllers",
		"com.example.TechBuds.Config"
})
public class TechBudsApplication {

	public static void main(String[] args) {
		SpringApplication.run(TechBudsApplication.class, args);
	}
}
