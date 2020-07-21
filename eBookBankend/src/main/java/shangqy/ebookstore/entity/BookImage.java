package shangqy.ebookstore.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "book_image")
public class BookImage {
    @Id
    private int id;

    @Field(name = "image")
    private String imageBase64;

    public BookImage(int id, String imageBase64) {
        this.id = id;
        this.imageBase64 = imageBase64;
    }

    public String getImageBase64() {
        return imageBase64;
    }

    public void setImageBase64(String imageBase64) {
        this.imageBase64 = imageBase64;
    }
}
