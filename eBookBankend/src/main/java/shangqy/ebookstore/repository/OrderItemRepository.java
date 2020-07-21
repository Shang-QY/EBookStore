package shangqy.ebookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import shangqy.ebookstore.entity.Book;
import shangqy.ebookstore.entity.Order;
import shangqy.ebookstore.entity.OrderItem;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {
    List<OrderItem> findOrderItemsByOrder(Order order);

    List<OrderItem> findOrderItemsByBook(Book book);
}
