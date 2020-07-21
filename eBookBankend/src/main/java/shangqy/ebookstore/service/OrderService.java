package shangqy.ebookstore.service;

import shangqy.ebookstore.entity.Order;
import shangqy.ebookstore.entity.OrderItem;

import java.util.List;

public interface OrderService {

    List<Order> findOnesOrder(Integer userID);

    List<OrderItem> findOrderItemsByOrderID(Integer orderID);

    List<Order> findAllOrders();

}
