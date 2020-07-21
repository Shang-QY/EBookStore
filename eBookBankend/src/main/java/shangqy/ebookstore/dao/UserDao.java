package shangqy.ebookstore.dao;

import shangqy.ebookstore.entity.Icon;
import shangqy.ebookstore.entity.User;

import java.util.List;

public interface UserDao {

    User addUser(String username, String password, String name, String tel, String email, String address, Icon icon);

    User changeIcon(Integer userId, Icon icon);

    User findOne(Integer userId);

    User checkUser(String username, String password);

    List<User> findAll();

    User changeOnesBanState(Integer userID);
}
