package com.example.shopping.service;

import com.example.shopping.repository.CustomerRepository;
import com.example.shopping.dto.Purchase;
import com.example.shopping.dto.PurchaseResponse;
import com.example.shopping.entity.Customer;
import com.example.shopping.entity.Order;
import com.example.shopping.entity.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    private CustomerRepository customerRepository;

    @Autowired
    public CheckoutServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public PurchaseResponse placeOrder(Purchase purchase) {

        Order order = purchase.getOrder();

        order.setOrderTrackingNumber(UUID.randomUUID().toString());

        for (OrderItem orderItem : purchase.getOrderItems()) {
            order.addOrderItem(orderItem);
        }

        order.setShippingAddress(purchase.getShippingAddress());
        order.setBillingAddress(purchase.getBillingAddress());

        String username = purchase.getCustomer().getUsername();
        Customer customer = customerRepository.findByUsername(username);
        customer.addOrder(order);

        customerRepository.save(customer);

        return new PurchaseResponse("success");

    }
}
