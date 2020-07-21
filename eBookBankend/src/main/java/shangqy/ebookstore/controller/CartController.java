package shangqy.ebookstore.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import shangqy.ebookstore.entity.Cart;
import shangqy.ebookstore.entity.Order;
import shangqy.ebookstore.entity.OrderItem;
import shangqy.ebookstore.service.CartService;

import java.util.List;

@RestController
@RequestMapping("/cart")
@CrossOrigin
public class CartController {
    @Autowired
    CartService cartService;

    @GetMapping("/findCart/{userID}")
    public List<Cart> findCartItemsByUser(@PathVariable Integer userID) {
        System.out.println("findCart");
        return cartService.findCartItemsByUser(userID);
    }

    @PostMapping("/delete/{userID}/{itemID}")
    public Cart deleteCartItem(@PathVariable Integer userID, @PathVariable Integer itemID) {
        return cartService.deleteCartItem(userID, itemID);
    }

    @PostMapping("/changeAmount/{itemID}/{amount}")
    public Cart changeItemAmount(@PathVariable Integer itemID, @PathVariable Integer amount) {
        return cartService.changeAmount(itemID, amount);
    }

    @PostMapping("/addCartItem/{bookID}/{amount}/{userID}")
    public Cart addCartItem(@PathVariable("bookID") Integer bookID,
                            @PathVariable("amount") Integer amount,
                            @PathVariable("userID") Integer userID) {
        return cartService.addBookToCart(bookID, userID, amount);
    }

    @PostMapping("/addCartToOrder/{userID}")
    public Order addOrder(@PathVariable Integer userID) {
        return cartService.addCartToOrder(userID);
    }
}
