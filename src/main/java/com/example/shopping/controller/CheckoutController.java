package com.example.shopping.controller;

import com.example.shopping.dto.Purchase;
import com.example.shopping.dto.PurchaseResponse;
import com.example.shopping.service.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    private CheckoutService checkoutService;

    @Autowired
    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase, Authentication authentication) {
        System.out.println(purchase);
        if (!authentication.getName().equals(purchase.getCustomer().getUsername()))
            throw new RuntimeException();
        return checkoutService.placeOrder(purchase);
    }
}
