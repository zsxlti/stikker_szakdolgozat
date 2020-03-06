package entity;

import java.util.Date;

public class PurchaseEntity {

    public int Id;
    public String customerID;
    public Date date;

    public PurchaseEntity() {
    }

    public PurchaseEntity(int id, String sellerID, String customerID, Date date) {
        Id = id;
        this.customerID = customerID;
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
