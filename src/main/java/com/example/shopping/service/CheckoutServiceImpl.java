package com.example.shopping.service;

import com.example.shopping.dao.CustomerRepository;
import com.example.shopping.dto.Purchase;
import com.example.shopping.dto.PurchaseResponse;
import com.example.shopping.entity.Customer;
import com.example.shopping.entity.Order;
import com.example.shopping.entity.OrderItem;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
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

        Customer customer = purchase.getCustomer();
        customer.addOrder(order);

        customerRepository.save(customer);

        return new PurchaseResponse(order.getOrderTrackingNumber());

        // 206 video
//        PurchaseResponse response = new PurchaseResponse();
//        response.setOrderTrackingNumber("ffff");
//        response.setCustomer(purchase.getCustomer());
//        response.setShippingAddress(purchase.getShippingAddress());
//        response.setBillingAddress(purchase.getBillingAddress());
//        response.setOrder(purchase.getOrder());
//        response.setOrderItems(purchase.getOrderItems());

//        return response;
    }
}
