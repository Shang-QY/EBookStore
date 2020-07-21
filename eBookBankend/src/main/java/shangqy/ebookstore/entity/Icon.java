package shangqy.ebookstore.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "icon_store")
public class Icon {
    @Id
    private int id;

    @Field(name = "Icon")
    private String iconBase64;

    public Icon(int id, String iconBase64) {
        this.id = id;
        this.iconBase64 = iconBase64;
    }

    public String getIconBase64() {
        return iconBase64;
    }

    public void setIconBase64(String iconBase64) {
        this.iconBase64 = iconBase64;
    }
}
