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
}
