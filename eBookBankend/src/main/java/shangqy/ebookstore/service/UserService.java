package shangqy.ebookstore.service;

import shangqy.ebookstore.entity.Icon;
import shangqy.ebookstore.entity.User;

import java.util.List;

public interface UserService {
    User checkUser(String username, String password);

    User addUser(String username, String password, String name, String tel, String email, String address);

    List<Icon> showIcons();

    User changeIcon(Integer userID, Integer IconID);

    List<User> getAllUsers();

    User changeOnesBanState(Integer userID);
}
