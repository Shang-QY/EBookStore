package shangqy.ebookstore.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import shangqy.ebookstore.dao.IconDao;
import shangqy.ebookstore.dao.UserDao;
import shangqy.ebookstore.entity.Icon;
import shangqy.ebookstore.entity.User;
import shangqy.ebookstore.entity.UserIcon;
import shangqy.ebookstore.service.UserService;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private IconDao iconDao;

    @Override
    public User checkUser(String username, String password) {
        System.out.println(userDao.checkUser(username, password));
        return userDao.checkUser(username, password);
    }

    @Override
    public User addUser(String username, String password, String name, String tel, String email, String address) {
        System.out.println("I'm service in addUser");
        Icon icon = iconDao.findOne(1);
        return userDao.addUser(username, password, name, tel, email, address, icon);
    }

    @Override
    public List<Icon> showIcons() {
        return iconDao.getIcons();
    }

    @Override
    public User changeIcon(Integer userID, Integer iconID) {
        Icon icon = iconDao.findOne(iconID);
        System.out.println("I'm service for change");
        return userDao.changeIcon(userID, icon);
    }

    @Override
    public List<User> getAllUsers() {
        return userDao.findAll();
    }

    @Override
    public User changeOnesBanState(Integer userID) {
        return userDao.changeOnesBanState(userID);
    }
}
