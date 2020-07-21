package shangqy.ebookstore.daoimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import shangqy.ebookstore.dao.BookDao;
import shangqy.ebookstore.entity.Book;
import shangqy.ebookstore.entity.BookImage;
import shangqy.ebookstore.repository.BookImageRepository;
import shangqy.ebookstore.repository.BookRepository;

import java.util.List;
import java.util.Optional;

@Repository
public class BookDaoImpl implements BookDao {
    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookImageRepository bookImageRepository;

    @Override
    public Book changeInventory(Integer id, Integer amount) {
        Book book = bookRepository.getOne(id);
        Integer number = book.getInventory();
        book.setInventory(number - amount);
        return bookRepository.saveAndFlush(book);
    }

    @Override
    public Book findOne(Integer id) {
        Book book = bookRepository.getOne(id);
        Optional<BookImage> image = bookImageRepository.findById(book.getBookId());
        if (image.isPresent()){
            book.setImage(image.get());
        }
        else{
            book.setImage(null);
        }
        return book;
    }

    @Override
    public List<Book> getBooks() {
        List<Book> books = bookRepository.getBooks();
        for (Book b : books){
            Optional<BookImage> image = bookImageRepository.findById(b.getBookId());
            if (image.isPresent()){
                b.setImage(image.get());
            }
            else{
                b.setImage(null);
            }
        }
        return books;
    }

    @Override
    public Book changeOnesInfo(Integer bookId, String imageBase64, String name, String author, String isbn, Integer inventory, Integer price, String description) {
        Book book = bookRepository.getOne(bookId);
        book.setName(name);
        book.setAuthor(author);
        book.setIsbn(isbn);
        book.setInventory(inventory);
        book.setPrice(price);
        book.setDescription(description);
        bookRepository.saveAndFlush(book);
        Optional<BookImage> image = bookImageRepository.findById(book.getBookId());
        if(imageBase64 == null){
            if (image.isPresent()){
                book.setImage(image.get());
            }
            else{
                book.setImage(null);
            }
        }
        else{
            if (image.isPresent()){
                image.get().setImageBase64(imageBase64);
                book.setImage(image.get());
                bookImageRepository.save(image.get());
            }
            else{
                BookImage bookImage = new BookImage(book.getBookId(), imageBase64);
                bookImageRepository.save(bookImage);
                book.setImage(bookImage);
            }
        }
        return book;
    }

    @Override
    public Book deleteOneBook(Integer bookId) {
        Book book = bookRepository.getOne(bookId);
        Optional<BookImage> image = bookImageRepository.findById(book.getBookId());
        image.ifPresent(bookImage -> bookImageRepository.delete(bookImage));
        bookRepository.delete(book);
        return book;
    }

    @Override
    public Book insertNewBook(String imageBase64, String name, String author, String type, String isbn, Integer inventory, Integer price, String description) {
        Book book = new Book();
        book.setName(name);
        book.setAuthor(author);
        book.setType(type);
        book.setIsbn(isbn);
        book.setInventory(inventory);
        book.setPrice(price);
        book.setDescription(description);
        bookRepository.saveAndFlush(book);
        System.out.println("book insert success");
        System.out.println(book.getBookId());
        BookImage bookImage = new BookImage(book.getBookId(), imageBase64);
        bookImageRepository.save(bookImage);
        book.setImage(bookImage);
        return book;
    }
}
