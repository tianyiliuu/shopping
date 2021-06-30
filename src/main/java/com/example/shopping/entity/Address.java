package com.example.shopping.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String address;
    private String address2;
    private String city;
    private String province;
    private String postalCode;

    @OneToOne
    private Order order;
}
