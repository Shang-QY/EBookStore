package shangqy.ebookstore.service;

import shangqy.ebookstore.entity.Book;

import java.util.List;

public interface BookService {
    Book findBookById(Integer id);

    List<Book> getBooks();

    Book changeOnesInfo(Integer bookId, String imageBase64, String name, String author, String isbn, Integer inventory, Integer price, String description);

    Book deleteOneBook(Integer bookId);

    Book insertNewBook(String imageBase64, String name, String author, String type, String isbn, Integer inventory, Integer price, String description);

}
