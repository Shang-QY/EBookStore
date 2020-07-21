package shangqy.ebookstore.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import shangqy.ebookstore.dao.BookDao;
import shangqy.ebookstore.dao.CartDao;
import shangqy.ebookstore.dao.OrderDao;
import shangqy.ebookstore.entity.Book;
import shangqy.ebookstore.service.BookService;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {
    @Autowired
    private BookDao bookDao;
    @Autowired
    private OrderDao orderDao;
    @Autowired
    private CartDao cartDao;

    @Override
    public Book findBookById(Integer id) {
        return bookDao.findOne(id);
    }

    @Override
    public List<Book> getBooks() {
        return bookDao.getBooks();
    }

    @Override
    public Book changeOnesInfo(Integer bookId, String imageBase64, String name, String author, String isbn, Integer inventory, Integer price, String description) {
        return bookDao.changeOnesInfo(bookId, imageBase64, name, author, isbn, inventory, price, description);
    }

    @Override
    public Book deleteOneBook(Integer bookId) {
        Book book = bookDao.findOne(bookId);
        orderDao.deleteOrderItemsByBook(book);
        cartDao.deleteCartItemsByBook(book);
        return bookDao.deleteOneBook(bookId);
    }

    @Override
    public Book insertNewBook(String imageBase64, String name, String author, String type, String isbn, Integer inventory, Integer price, String description) {
        return bookDao.insertNewBook(imageBase64, name, author, type, isbn, inventory, price, description);
    }
}
