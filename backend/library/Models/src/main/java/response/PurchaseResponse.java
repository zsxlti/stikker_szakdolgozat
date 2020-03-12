package response;

import entity.PurchaseEntity;
import io.swagger.annotations.ApiModel;

import java.time.LocalDate;

@ApiModel
public class PurchaseResponse {
    public String customerID;
    public LocalDate date;

    public PurchaseResponse() {
    }

    public PurchaseResponse(String sellerID, String customerID, LocalDate date) {
        this.customerID = customerID;
        this.date = date;
    }

    public PurchaseResponse(PurchaseEntity purchase)
    {
        if (purchase==null)
        {
            return;
        }
        customerID=purchase.CustomerID;
        date=purchase.PurchaseDate;
    }
}
