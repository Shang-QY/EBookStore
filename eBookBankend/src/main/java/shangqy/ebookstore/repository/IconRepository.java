package shangqy.ebookstore.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import shangqy.ebookstore.entity.Icon;

public interface IconRepository extends MongoRepository<Icon, Integer> {
}
