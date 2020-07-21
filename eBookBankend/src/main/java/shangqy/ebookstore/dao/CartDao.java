package shangqy.ebookstore.dao;

import shangqy.ebookstore.entity.*;

import java.util.List;

public interface CartDao {
    Cart addCartItem(Book book, User user, Integer amount);

    Cart deleteCartItem(Integer itemID);



    Cart changeItemAmount(Integer itemID, Integer amount);

    List<Cart> findCartItemsByUser(User user);

    void deleteCartItemsByBook(Book book);
}
