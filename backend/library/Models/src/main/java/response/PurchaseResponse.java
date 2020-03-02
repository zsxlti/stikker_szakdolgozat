package response;

import entity.PurchaseEntity;
import io.swagger.annotations.ApiModel;

import java.util.Date;

@ApiModel
public class PurchaseResponse {
    public String customerID;
    public int stickerID;
    public Date date;

    public PurchaseResponse() {
    }

    public PurchaseResponse(String sellerID, String customerID, int stickerID, Date date) {
        this.customerID = customerID;
        this.stickerID = stickerID;
        this.date = date;
    }

    public PurchaseResponse(PurchaseEntity purchase)
    {
        if (purchase==null)
        {
            return;
        }
        customerID=purchase.customerID;
        stickerID=purchase.stickerID;
        date=purchase.date;

    }
}
