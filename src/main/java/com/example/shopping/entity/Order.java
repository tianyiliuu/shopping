package com.example.shopping.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String orderTrackingNumber;
    private int totalQuantity;
    private BigDecimal totalPrice;

    private String status;

    @CreationTimestamp
    private Date dateCreated;

    @UpdateTimestamp
    private Date lastUpdated;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "order")
    private Set<OrderItem> orderItems = new HashSet<>();

    @ManyToOne
    private Customer customer;

    @OneToOne(cascade = CascadeType.ALL, mappedBy = "order")
    private Address shippingAddress;

    @OneToOne(cascade = CascadeType.ALL, mappedBy = "order")
    private Address billingAddress;

    public void addOrderItem(OrderItem orderItem) {
        orderItems.add(orderItem);
        orderItem.setOrder(this);
    }
}
