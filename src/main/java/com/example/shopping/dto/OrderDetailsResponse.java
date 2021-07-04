package com.example.shopping.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;

@Data
public class OrderDetailsResponse {
    
    private Long id;
    private int totalQuantity;
    private BigDecimal totalPrice;
    private Date dateCreated;
    private Set<OrderItemDetailsResponse> orderItems;

}
