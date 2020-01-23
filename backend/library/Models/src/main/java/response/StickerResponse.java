package response;

import entity.StickerEntity;
import io.swagger.annotations.ApiModel;

@ApiModel
public class StickerResponse {
    public String Description;
    public String URL;
    public String Wanted;
    public String Offered;
    public String ProfileID;

    public StickerResponse() {
    }

    public StickerResponse(String description, String URL, String wanted, String offered, String profileID) {
        Description = description;
        this.URL = URL;
        Wanted = wanted;
        Offered = offered;
        ProfileID = profileID;
    }

    public StickerResponse(StickerEntity sticker)
    {
        if (sticker==null)
        {
            return;
        }

        Description=sticker.Description;
        URL=sticker.URL;
        Wanted=sticker.Wanted;
        Offered=sticker.Offered;
        ProfileID=sticker.ProfileID;
    }
}
