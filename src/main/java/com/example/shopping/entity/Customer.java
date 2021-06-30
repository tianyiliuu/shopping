package com.example.shopping.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String firstName;
    private String lastName;
    private String email;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "customer")
    private Set<Order> orders = new HashSet<>();

    public void addOrder(Order order) {
        orders.add(order);
        order.setCustomer(this);
    }
}
