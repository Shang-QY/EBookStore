package shangqy.ebookstore.entity;

public class BookStatistic {
    private Book book;
    private Integer sales;
    private Integer prices;

    public BookStatistic(Book book, Integer sales) {
        this.book = book;
        this.sales = sales;
        this.prices = book.getPrice()*sales;
    }

    public Integer getPrices() {
        return prices;
    }

    public void setPrices(Integer prices) {
        this.prices = prices;
    }

    public Integer getSales() {
        return sales;
    }

    public void setSales(Integer sales) {
        this.sales = sales;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }
}
