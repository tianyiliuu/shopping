package com.example.shopping.repository;

import com.example.shopping.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RestResource;

@RestResource
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {


}
