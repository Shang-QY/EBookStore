package shangqy.ebookstore.service;

import shangqy.ebookstore.entity.Cart;
import shangqy.ebookstore.entity.Order;
import shangqy.ebookstore.entity.OrderItem;

import java.util.List;

public interface CartService {
    Cart addBookToCart(Integer bookID, Integer userID, Integer amount);

    List<Cart> findCartItemsByUser(Integer userID);

    Order addCartToOrder(Integer userID);

    Cart deleteCartItem(Integer userID, Integer itemID);

    Cart changeAmount(Integer itemID, Integer amount);

}

