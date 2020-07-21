package shangqy.ebookstore.entity;

import java.util.List;

public class UserStatistic {

    private User user;
    private Integer buys;
    private Integer costs;
    private List<BookStatistic> bookStatistics;

    public UserStatistic(User user, List<BookStatistic> bookStatistics) {
        this.user = user;
        this.bookStatistics = bookStatistics;
        this.buys = 0;
        this.costs = 0;

        for (BookStatistic book: bookStatistics) {
            this.buys += book.getSales();
            this.costs += book.getPrices();
        }
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Integer getBuys() {
        return buys;
    }

    public void setBuys(Integer buys) {
        this.buys = buys;
    }

    public Integer getCosts() {
        return costs;
    }

    public void setCosts(Integer costs) {
        this.costs = costs;
    }

    public List<BookStatistic> getBookStatistics() {
        return bookStatistics;
    }

    public void setBookStatistics(List<BookStatistic> bookStatistics) {
        this.bookStatistics = bookStatistics;
    }
}
