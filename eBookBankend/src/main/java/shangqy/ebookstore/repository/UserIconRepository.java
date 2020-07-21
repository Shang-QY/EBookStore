package shangqy.ebookstore.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import shangqy.ebookstore.entity.UserIcon;

public interface UserIconRepository extends MongoRepository<UserIcon, Integer> {
}
