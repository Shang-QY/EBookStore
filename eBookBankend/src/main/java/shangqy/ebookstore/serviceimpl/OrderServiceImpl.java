package shangqy.ebookstore.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import shangqy.ebookstore.dao.BookDao;
import shangqy.ebookstore.dao.OrderDao;
import shangqy.ebookstore.dao.UserDao;
import shangqy.ebookstore.entity.Order;
import shangqy.ebookstore.entity.OrderItem;
import shangqy.ebookstore.entity.User;
import shangqy.ebookstore.service.OrderService;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderDao orderDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private BookDao bookDao;

    @Override
    public List<Order> findOnesOrder(Integer userID) {
        User user = userDao.findOne(userID);
        return orderDao.findByUserID(user);
    }

    @Override
    public List<OrderItem> findOrderItemsByOrderID(Integer orderID) {
        System.out.println("I'm Service");
        List<OrderItem> orderItems = orderDao.findOrderItemsByOrder(orderDao.findOrderByOrderID(orderID));
        for(OrderItem o : orderItems){
            o.setBook(bookDao.findOne(o.getBook().getBookId()));
        }
        return orderItems;
    }

    @Override
    public List<Order> findAllOrders() {
        return orderDao.findAllOrders();
    }

}
