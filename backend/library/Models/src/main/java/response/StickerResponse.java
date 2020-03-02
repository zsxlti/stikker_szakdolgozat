package response;

import entity.StickerEntity;
import io.swagger.annotations.ApiModel;

@ApiModel
public class StickerResponse {
    public String Description;
    public String URL;
    public int Price;

    public StickerResponse() {
    }

    public StickerResponse(String description, String URL, int price) {
        Description = description;
        this.URL = URL;
        Price = price;
    }

    public StickerResponse(StickerEntity sticker)
    {
        if (sticker==null)
        {
            return;
        }

        Description=sticker.Description;
        URL=sticker.URL;
        Price =sticker.Price;
    }
}
