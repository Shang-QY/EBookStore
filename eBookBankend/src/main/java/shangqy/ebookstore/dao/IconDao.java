package shangqy.ebookstore.dao;

import shangqy.ebookstore.entity.Icon;

import java.util.List;

public interface IconDao {
    Icon findOne(Integer id);

    List<Icon> getIcons();
}
