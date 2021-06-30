package com.example.shopping.service;

import com.example.shopping.dao.CustomerRepository;
import com.example.shopping.dto.Purchase;
import com.example.shopping.dto.PurchaseResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    private CustomerRepository customerRepository;

    @Autowired
    public CheckoutServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public PurchaseResponse placeOrder(Purchase purchase) {
        // 206 video
        PurchaseResponse response = new PurchaseResponse();
        response.setOrderTrackingNumber("ffff");
        response.setCustomer(purchase.getCustomer());
        response.setShippingAddress(purchase.getShippingAddress());
        response.setBillingAddress(purchase.getBillingAddress());
        response.setOrder(purchase.getOrder());
        response.setOrderItems(purchase.getOrderItems());

        return response;
    }
}
