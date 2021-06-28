package com.example.shopping.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private ProductCategory category;

    private String sku;

    private String name;

    private String description;

    private BigDecimal unitPrice;

    private String imageUrl;

    private boolean active;

    private int unitsInStock;

    @CreationTimestamp
    private Date dateCreated;

    @UpdateTimestamp
    private Date lastUpdated;

    public Product(String sku, String name, String description, String imageUrl, boolean active, int unitsInStock, BigDecimal unitPrice) {
        this.sku = sku;
        this.name = name;
        this.description = description;
        this.unitPrice = unitPrice;
        this.imageUrl = imageUrl;
        this.active = active;
        this.unitsInStock = unitsInStock;
    }

    public Product(String sku, String name, String description, String imageUrl, boolean active, int unitsInStock, double unitPrice) {
        this.sku = sku;
        this.name = name;
        this.description = description;
        this.unitPrice = new BigDecimal(String.valueOf(unitPrice));
        this.imageUrl = imageUrl;
        this.active = active;
        this.unitsInStock = unitsInStock;
    }
}
