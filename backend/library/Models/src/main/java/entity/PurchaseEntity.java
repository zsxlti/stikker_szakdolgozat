package entity;

import java.util.Date;

public class PurchaseEntity {

    public int Id;
    public String customerID;
    public int stickerID;
    public Date date;

    public PurchaseEntity() {
    }

    public PurchaseEntity(int id, String sellerID, String customerID, int stickerID, Date date) {
        Id = id;
        this.customerID = customerID;
        this.stickerID = stickerID;
        this.date = date;
    }

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getCustomerID() {
        return customerID;
    }

    public void setCustomerID(String customerID) {
        this.customerID = customerID;
    }

    public int getStickerID() {
        return stickerID;
    }

    public void setStickerID(int stickerID) {
        this.stickerID = stickerID;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
