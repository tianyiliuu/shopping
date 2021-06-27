package com.example.shopping.config;

import com.example.shopping.dao.ProductCategoryRepository;
import com.example.shopping.dao.ProductRepository;
import com.example.shopping.entity.Product;
import com.example.shopping.entity.ProductCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private ProductRepository productRepository;
    private ProductCategoryRepository productCategoryRepository;

    @Autowired
    public DatabaseLoader(ProductRepository productRepository, ProductCategoryRepository productCategoryRepository) {
        this.productRepository = productRepository;
        this.productCategoryRepository = productCategoryRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        ProductCategory book = new ProductCategory("BOOK");
        Product product1 = new Product("BOOK-TECH-1000", "JavaScript - The Fun Parts", "Learn JavaScript",
                "assets/images/products/placeholder.png", true, 100, new BigDecimal("19.99"));
        Product product2 = new Product("BOOK-TECH-1001", "Spring Framework Tutorial", "Learn Spring",
                "assets/images/products/placeholder.png", true, 100, new BigDecimal("29.99"));
        Product product3 = new Product("BOOK-TECH-1002", "Kubernetes - Deploying Containers", "Learn Kubernetes",
                "assets/images/products/placeholder.png", true, 100, new BigDecimal("24.99"));
        Product product4 = new Product("BOOK-TECH-1003", "Internet of Things (IoT) - Getting Started", "Learn IoT",
                "assets/images/products/placeholder.png", true, 100, new BigDecimal("29.99"));
        Product product5 = new Product("BOOK-TECH-1004", "The Go Programming Language: A to Z", "Learn Go",
                "assets/images/products/placeholder.png", true, 100, new BigDecimal("24.99"));
        book.addProduct(product1);
        book.addProduct(product2);
        book.addProduct(product3);
        book.addProduct(product4);
        book.addProduct(product5);
        productCategoryRepository.save(book);
    }
}
