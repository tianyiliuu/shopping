package com.example.shopping.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class OrderItemDetailsResponse {

    private String name;

    private String description;

    private String imageUrl;

    private int quantity;

    private BigDecimal unitPrice;
}
