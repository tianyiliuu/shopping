package com.example.shopping.dto;

import com.example.shopping.entity.OrderItem;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;

@Data
public class OrderResponse {

    private Long id;
    private int totalQuantity;
    private BigDecimal totalPrice;
    private Date dateCreated;
    private Set<OrderItem> orderItems;

}
