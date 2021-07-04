package com.example.shopping.controller;

import com.example.shopping.dto.OrderDetailsResponse;
import com.example.shopping.dto.OrderItemDetailsResponse;
import com.example.shopping.dto.OrderResponse;
import com.example.shopping.entity.Customer;
import com.example.shopping.entity.Order;
import com.example.shopping.entity.OrderItem;
import com.example.shopping.entity.Product;
import com.example.shopping.repository.CustomerRepository;
import com.example.shopping.repository.OrderRepository;
import com.example.shopping.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("/api")
public class OrderController {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/ordersByUsername/{username}")
    public List<OrderResponse> getOrdersByUsername(@PathVariable String username) {
        Customer customer = customerRepository.findByUsername(username);
        List<OrderResponse> orders = new ArrayList<>();
        for (Order order : customer.getOrders()) {
            OrderResponse response = new OrderResponse();
            response.setId(order.getId());
            response.setDateCreated(order.getDateCreated());
            response.setTotalPrice(order.getTotalPrice());
            response.setTotalQuantity(order.getTotalQuantity());
            response.setOrderItems(order.getOrderItems());
            orders.add(response);
        }
        return orders;
    }

    @GetMapping("/orders/{orderId}")
    public OrderDetailsResponse getOrderDetails(@PathVariable String orderId) {
        Order order = orderRepository.findOrderById(Long.valueOf(orderId));
        OrderDetailsResponse response = new OrderDetailsResponse();
        response.setDateCreated(order.getDateCreated());
        response.setTotalPrice(order.getTotalPrice());
        response.setTotalQuantity(order.getTotalQuantity());
        Set<OrderItemDetailsResponse> set = new HashSet<>();
        for (OrderItem orderItem : order.getOrderItems()) {
            Product product = productRepository.findById(orderItem.getProductId()).orElse(null);
            OrderItemDetailsResponse itemDetailsResponse = new OrderItemDetailsResponse();
            itemDetailsResponse.setName(product.getName());
            itemDetailsResponse.setDescription(product.getDescription());
            itemDetailsResponse.setImageUrl(product.getImageUrl());
            itemDetailsResponse.setUnitPrice(product.getUnitPrice());
            itemDetailsResponse.setQuantity(orderItem.getQuantity());
            set.add(itemDetailsResponse);
        }
        response.setOrderItems(set);
        return response;
    }
}
