package shangqy.ebookstore.controller;

import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import shangqy.ebookstore.entity.Cart;
import shangqy.ebookstore.entity.Icon;
import shangqy.ebookstore.entity.User;
import shangqy.ebookstore.service.UserService;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping("/login")
    public User login(@RequestBody Map<String, String> params) {
        System.out.println("login controller");
        String username = params.get("username");
        String password = params.get("password");
        return userService.checkUser(username, password);
    }

    @PostMapping("/signUp")
    public User signUp(@RequestBody Map<String, String> params) {
        System.out.println("I'm controller");
        String username = params.get("username");
        String password = params.get("password");
        String name = params.get("name");
        String tel = params.get("tel");
        String email = params.get("email");
        String address = params.get("address");
        return userService.addUser(username, password, name, tel, email, address);
    }

    @RequestMapping("/showIcons")
    public List<Icon> showIcons() {
        return userService.showIcons();
    }

    @PostMapping("/changeIcon/{userID}/{iconID}")
    public User changeOnesIcon(@PathVariable Integer userID, @PathVariable Integer iconID) {
        System.out.println("i'm controller for changeIcon.");
        return userService.changeIcon(userID, iconID);
    }

    @GetMapping("/getAllUsers")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @PostMapping("/changeBanState/{userID}")
    public User banUser(@PathVariable Integer userID){
        return userService.changeOnesBanState(userID);
    }
}
