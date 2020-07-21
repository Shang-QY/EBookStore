package shangqy.ebookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import shangqy.ebookstore.entity.Order;
import shangqy.ebookstore.entity.User;

import java.util.Date;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {

    List<Order> findOrdersByUser(User user);

    List<Order> findOrdersByDateBetween(Date date1, Date date2);

    List<Order> findOrdersByDateBetweenAndUser(Date date1, Date date2, User user);
}
