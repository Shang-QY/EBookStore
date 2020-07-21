package shangqy.ebookstore.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import shangqy.ebookstore.dao.BookDao;
import shangqy.ebookstore.dao.CartDao;
import shangqy.ebookstore.dao.OrderDao;
import shangqy.ebookstore.dao.UserDao;
import shangqy.ebookstore.entity.Book;
import shangqy.ebookstore.entity.Cart;
import shangqy.ebookstore.entity.Order;
import shangqy.ebookstore.entity.User;
import shangqy.ebookstore.service.CartService;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    OrderDao orderDao;
    @Autowired
    CartDao cartDao;
    @Autowired
    UserDao userDao;
    @Autowired
    BookDao bookDao;

    @Override
    public Cart addBookToCart(Integer bookID, Integer userID, Integer amount) {
        Book book = bookDao.findOne(bookID);
        User user = userDao.findOne(userID);
        return cartDao.addCartItem(book, user, amount);
    }

    @Override
    public List<Cart> findCartItemsByUser(Integer userID) {
        System.out.println("I'm Service");
        User user = userDao.findOne(userID);
        List<Cart> carts = cartDao.findCartItemsByUser(user);
        for(Cart cart : carts){
            cart.setBook(bookDao.findOne(cart.getBook().getBookId()));
        }
        return carts;
    }

    @Override
    public Order addCartToOrder(Integer userID) {
        System.out.println("I'm Service in addCartToOrder");
        User user = userDao.findOne(userID);
        List<Cart> Carts = cartDao.findCartItemsByUser(user);
        for(Cart cart : Carts){
            Book book = cart.getBook();
            bookDao.changeInventory(book.getBookId(), cart.getAmount());
            deleteCartItem(userID, cart.getId());
        }
        return orderDao.addCartToOrder(user, Carts);
    }

    @Override
    public Cart deleteCartItem(Integer userID, Integer itemID) {
        return cartDao.deleteCartItem(itemID);
    }

    @Override
    public Cart changeAmount(Integer itemID, Integer amount) {
        return cartDao.changeItemAmount(itemID, amount);
    }
}
