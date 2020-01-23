package response;

import entity.TradeEntity;

import java.util.Date;

public class TradeResponse {
    public String sellerID;
    public String customerID;
    public int stickerID;
    public Date date;

    public TradeResponse() {
    }

    public TradeResponse(String sellerID, String customerID, int stickerID, Date date) {
        this.sellerID = sellerID;
        this.customerID = customerID;
        this.stickerID = stickerID;
        this.date = date;
    }

    public TradeResponse(TradeEntity trade)
    {
        if (trade==null)
        {
            return;
        }
        sellerID=trade.sellerID;
        customerID=trade.customerID;
        stickerID=trade.stickerID;
        date=trade.date;

    }
}
