package entity;


import java.time.LocalDate;

public class PurchaseEntity {

    public int Id;
    public String CustomerID;
    public LocalDate PurchaseDate;

    public PurchaseEntity() {
    }

    public PurchaseEntity(int id,  String customerID, LocalDate purchaseDate) {
        Id = id;
        this.CustomerID = customerID;
        this.PurchaseDate = purchaseDate;
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
