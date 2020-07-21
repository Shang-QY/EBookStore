package shangqy.ebookstore.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import shangqy.ebookstore.dao.BookDao;
import shangqy.ebookstore.dao.OrderDao;
import shangqy.ebookstore.dao.UserDao;
import shangqy.ebookstore.entity.*;
import shangqy.ebookstore.service.StatisticService;

import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

@Service
public class StatisticServiceImpl implements StatisticService {
    @Autowired
    BookDao bookDao;

    @Autowired
    UserDao userDao;

    @Autowired
    OrderDao orderDao;

    private List<BookStatistic> getBookStatistics(List<Order> orders) {
        HashMap<Book, Integer> bookHashMap = new HashMap<>();
        for (Order o : orders) {
            List<OrderItem> orderItems = orderDao.findOrderItemsByOrder(o);
            for (OrderItem item : orderItems) {
                if (bookHashMap.containsKey(item.getBook()))
                    bookHashMap.put(item.getBook(), bookHashMap.get(item.getBook()) + item.getAmount());
                else
                    bookHashMap.put(item.getBook(), item.getAmount());
            }
        }

        List<BookStatistic> bookStatistics = new LinkedList<>();
        for (Book key :
                bookHashMap.keySet()) {
            bookStatistics.add(new BookStatistic(key, bookHashMap.get(key)));
        }
        return bookStatistics;
    }

    @Override
    public List<BookStatistic> getSaleOfBook(Date date1, Date date2) {
        List<Order> orders = orderDao.findByDate(date1,date2);
        return getBookStatistics(orders);
    }

    @Override
    public List<UserStatistic> getSaleOfUser(Date date1, Date date2) {
        List<UserStatistic> userStatistics = new LinkedList<>();
        List<User> users = userDao.findAll();
        for (User user : users) {
            List<Order> orders = orderDao.findByDateAndUser(date1,date2,user);
            userStatistics.add(new UserStatistic(user,getBookStatistics(orders)));
        }
        return userStatistics;
    }

    @Override
    public List<BookStatistic> getBuyOfBook(Date date1, Date date2, Integer userID) {
        User user = userDao.findOne(userID);
        List<Order> orders = orderDao.findByDateAndUser(date1,date2, user);
        return getBookStatistics(orders);
    }

}
