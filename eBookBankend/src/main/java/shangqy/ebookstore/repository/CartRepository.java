package shangqy.ebookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import shangqy.ebookstore.entity.Book;
import shangqy.ebookstore.entity.Cart;
import shangqy.ebookstore.entity.User;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Integer> {

    List<Cart> findCartsByUser(User user);

    List<Cart> findCartsByBookAndUser(Book book, User user);

    List<Cart> findCartsByBook(Book book);
}
