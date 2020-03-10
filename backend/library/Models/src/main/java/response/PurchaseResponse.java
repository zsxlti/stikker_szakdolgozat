package response;

import entity.PurchaseEntity;
import io.swagger.annotations.ApiModel;

import java.util.Date;

@ApiModel
public class PurchaseResponse {
    public String customerID;
    public Date date;

    public PurchaseResponse() {
    }

    public PurchaseResponse(String sellerID, String customerID, Date date) {
        this.customerID = customerID;
        this.date = date;
    }

    public PurchaseResponse(PurchaseEntity purchase)
    {
        if (purchase==null)
        {
            return;
        }
        customerID=purchase.customerID;
        date=purchase.date;

    }
}
