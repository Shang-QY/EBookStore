package shangqy.ebookstore.daoimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import shangqy.ebookstore.dao.OrderDao;
import shangqy.ebookstore.entity.*;
import shangqy.ebookstore.repository.BookRepository;
import shangqy.ebookstore.repository.OrderItemRepository;
import shangqy.ebookstore.repository.OrderRepository;
import shangqy.ebookstore.repository.UserRepository;

import java.util.Date;
import java.util.List;

@Repository
public class OrderDaoImpl implements OrderDao {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Override
    public List<OrderItem> findOrderItemsByOrder(Order order) {
        return orderItemRepository.findOrderItemsByOrder(order);
    }

    @Override
    public Order findOrderByOrderID(Integer orderID) {
        return orderRepository.getOne(orderID);
    }

    @Override
    public Order addCartToOrder(User user, List<Cart> Carts) {
        Order order = new Order();
        order.setUser(user);
        order.setDate(new Date());
        order.setState("paid");
        orderRepository.saveAndFlush(order);
        for(Cart cart : Carts){
            OrderItem item = new OrderItem();
            item.setAmount(cart.getAmount());
            item.setBook(cart.getBook());
            item.setOrder(order);
            orderItemRepository.saveAndFlush(item);
        }

        return order;
    }

    @Override
    public List<OrderItem> deleteOrderItemsByBook(Book book) {
        List<OrderItem> orderItems = orderItemRepository.findOrderItemsByBook(book);
        for(OrderItem orderItem : orderItems){
            orderItemRepository.delete(orderItem);
        }
        return orderItems;
    }

    @Override
    public List<Order> findAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public List<Order> findByDate(Date date1, Date date2) {
        return orderRepository.findOrdersByDateBetween(date1, date2);
    }

    @Override
    public List<Order> findByDateAndUser(Date date1, Date date2, User user) {
        return orderRepository.findOrdersByDateBetweenAndUser(date1, date2, user);
    }

    @Override
    public List<Order> findByUserID(User user) {
        System.out.println("I'm DAO for fundByUserID");
        return orderRepository.findOrdersByUser(user);
    }

}
