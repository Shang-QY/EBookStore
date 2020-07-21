package shangqy.ebookstore.dao;

import shangqy.ebookstore.entity.Book;

import java.util.List;

public interface BookDao {
    Book changeInventory(Integer id, Integer amount);

    Book findOne(Integer id);

    List<Book> getBooks();

    Book changeOnesInfo(Integer bookId, String imageBase64, String name, String author, String isbn, Integer inventory, Integer price, String description);

    Book deleteOneBook(Integer bookId);

    Book insertNewBook(String imageBase64, String name, String author, String type, String isbn, Integer inventory, Integer price, String description);

}
