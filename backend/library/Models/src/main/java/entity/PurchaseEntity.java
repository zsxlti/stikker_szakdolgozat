package entity;


import java.time.LocalDate;
import java.util.Date;

public class PurchaseEntity {

    public int Id;
    public String customerID;
    public LocalDate date;

    public PurchaseEntity() {
    }

    public PurchaseEntity(int id, String sellerID, String customerID, LocalDate date) {
        Id = id;
        this.customerID = customerID;
        this.date = date;
    }

    /*public int getId() {
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

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }*/
}
