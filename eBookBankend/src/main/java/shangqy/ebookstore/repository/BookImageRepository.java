package shangqy.ebookstore.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import shangqy.ebookstore.entity.BookImage;

public interface BookImageRepository extends MongoRepository<BookImage, Integer> {

}
