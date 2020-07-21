package shangqy.ebookstore.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import shangqy.ebookstore.entity.Book;
import shangqy.ebookstore.service.BookService;

import java.util.List;
import java.util.Map;

@RestController
public class BookController {
    @Autowired
    private BookService bookService;

    @RequestMapping("/getBooks")
    public List<Book> getBooks(@RequestBody Map<String, String> params) {
        return bookService.getBooks();
    }

    @RequestMapping("/getBook")
    public Book getBook(@RequestParam("id") Integer id) {
        return bookService.findBookById(id);
    }

    @PostMapping("/changeOnesInfo")
    public Book changeOnesInfo(@RequestBody Map<String, String> params){
        System.out.println("I'm controller in change info");
        Integer bookId = Integer.valueOf(params.get("bookId"));
        String imageBase64 = params.get("imageBase64");
        if(imageBase64 == null) System.out.println("image is null!!!!");
        String name = params.get("name");
        String author = params.get("author");
        String isbn = params.get("isbn");
        Integer inventory = Integer.valueOf(params.get("inventory"));
        Integer price = Integer.valueOf(params.get("price"));
        String description = params.get("description");

        return bookService.changeOnesInfo(bookId, imageBase64, name, author, isbn, inventory, price, description);
    }

    @PostMapping("/deleteOneBook/{bookId}")
    public Book deleteOneBook(@PathVariable Integer bookId){
        return bookService.deleteOneBook(bookId);
    }

    @PostMapping("/insertNewBook")
    public Book insertNewBook(@RequestBody Map<String, String> params){
        System.out.println("I'm controller in insert book");
        String imageBase64 = params.get("imageBase64");
        String name = params.get("name");
        String author = params.get("author");
        String type = params.get("type");
        String isbn = params.get("isbn");
        Integer inventory = Integer.valueOf(params.get("inventory"));
        Integer price = Integer.valueOf(params.get("price"));
        String description = params.get("description");

        return bookService.insertNewBook(imageBase64, name, author, type, isbn, inventory, price, description);
    }
}
