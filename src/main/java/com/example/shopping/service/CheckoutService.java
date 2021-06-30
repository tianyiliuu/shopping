package com.example.shopping.service;

import com.example.shopping.dto.Purchase;
import com.example.shopping.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
}
