package entity;

public class StickerEntity {
    public int Id;
    public String Description;
    public String URL;
    public int Price;

    public StickerEntity() {
    }

    public StickerEntity(int id, String description, String URL, int price) {
        Id = id;
        Description = description;
        this.URL = URL;
        Price = price;
    }

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }

    public String getURL() {
        return URL;
    }

    public void setURL(String URL) {
        this.URL = URL;
    }

    public int getPrice() {
        return Price;
    }

    public void setPrice(int price) {
        Price = price;
    }
}
