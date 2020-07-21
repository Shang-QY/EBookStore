package shangqy.ebookstore.dao;

import shangqy.ebookstore.entity.*;

import java.util.Date;
import java.util.List;

public interface OrderDao {

    List<Order> findByUserID(User user);

    List<OrderItem> findOrderItemsByOrder(Order order);

    Order findOrderByOrderID(Integer orderID);

    Order addCartToOrder(User user, List<Cart> Carts);

    List<OrderItem> deleteOrderItemsByBook(Book book);

    List<Order> findAllOrders();

    List<Order> findByDate(Date date1, Date date2);

    List<Order> findByDateAndUser(Date date1, Date date2, User user);
}
