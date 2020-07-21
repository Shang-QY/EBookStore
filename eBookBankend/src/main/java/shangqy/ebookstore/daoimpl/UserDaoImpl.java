package shangqy.ebookstore.daoimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import shangqy.ebookstore.dao.UserDao;
import shangqy.ebookstore.entity.Cart;
import shangqy.ebookstore.entity.Icon;
import shangqy.ebookstore.entity.User;
import shangqy.ebookstore.entity.UserIcon;
import shangqy.ebookstore.repository.IconRepository;
import shangqy.ebookstore.repository.UserIconRepository;
import shangqy.ebookstore.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Repository
public class UserDaoImpl implements UserDao {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserIconRepository userIconRepository;

    @Override
    public User addUser(String username, String password, String name, String tel, String email, String address, Icon icon) {
        List<User> users = userRepository.findAll();
        for(User u : users){
            if(u.getUsername().equals(username)){
                User noUser = new User();
                noUser.setUserType(-2);
                return noUser;
            }
        }
        System.out.println("I'm Dao in addUser");
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setUserType(0);
        user.setName(name);
        user.setTel(tel);
        user.setEmail(email);
        user.setAddress(address);
        user.setBan(0);
        userRepository.saveAndFlush(user);

        String image;
        if(icon != null) image = icon.getIconBase64(); else image = null;
        UserIcon defaultIcon = new UserIcon(user.getUserId(), image);
        userIconRepository.save(defaultIcon);
        user.setIcon(defaultIcon);
        return user;
    }

    @Override
    public User changeIcon(Integer userId, Icon icon) {
        String image;
        System.out.println("i'm dao for change" + userId + "  ");
        if(icon != null) image = icon.getIconBase64(); else image = null;
        User user = userRepository.getOne(userId);
        Optional<UserIcon> userIcon = userIconRepository.findById(userId);
        if (userIcon.isPresent()){
            userIcon.get().setIconBase64(image);
            user.setIcon(userIcon.get());
            userIconRepository.save(userIcon.get());
        }
        return user;
    }

    @Override
    public User findOne(Integer userId) {
        User user = userRepository.getOne(userId);
        Optional<UserIcon> icon = userIconRepository.findById(user.getUserId());
        if (icon.isPresent()){
            user.setIcon(icon.get());
        }
        else{
            user.setIcon(null);
        }
        return user;
    }

    @Override
    public User checkUser(String username, String password) {
        User user = userRepository.checkUser(username, password);
        if(user == null){
            System.out.println("this user is bad password");
            User noUser = new User();
            noUser.setUserType(-1);
            return noUser;
        }

        Optional<UserIcon> icon = userIconRepository.findById(user.getUserId());

        if (icon.isPresent()){
            System.out.println("Not Null " + user.getUserId());
            user.setIcon(icon.get());
        }
        else{
            user.setIcon(null);
            System.out.println("It's Null");
        }
        return user;
    }

    @Override
    public List<User> findAll() {
        List<User> users = userRepository.findAll();
        for (User u : users){
            Optional<UserIcon> icon = userIconRepository.findById(u.getUserId());
            if (icon.isPresent()){
                u.setIcon(icon.get());
            }
            else{
                u.setIcon(null);
            }
        }
        return users;
    }

    @Override
    public User changeOnesBanState(Integer userID) {
        User user = userRepository.getOne(userID);
        Integer state = user.getBan();
        if(state == 0) user.setBan(1);
        else user.setBan(0);
        userRepository.saveAndFlush(user);
        return user;
    }
}
