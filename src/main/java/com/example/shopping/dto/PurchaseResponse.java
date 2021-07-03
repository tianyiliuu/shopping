package com.example.shopping.dto;

import com.example.shopping.entity.Address;
import com.example.shopping.entity.Customer;
import com.example.shopping.entity.Order;
import com.example.shopping.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class PurchaseResponse {
    private final String message;
//    private Customer customer;
//    private Address shippingAddress;
//    private Address billingAddress;
//    private Order order;
//    private Set<OrderItem> orderItems;
}
