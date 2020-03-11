package entity;

public class ItemEntity {
    public int Id;
    public int StickerId;
    public int PurchaseId;

    public ItemEntity() {
    }

    public ItemEntity(int id, int stickerId, int purchaseId) {
        Id = id;
        StickerId = stickerId;
        PurchaseId = purchaseId;
    }
    public ItemEntity(int stickerId, int purchaseId) {
        StickerId = stickerId;
        PurchaseId = purchaseId;
    }

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public int getStickerId() {
        return StickerId;
    }

    public void setStickerId(int stickerId) {
        StickerId = stickerId;
    }

    public int getPurchaseId() {
        return PurchaseId;
    }

    public void setPurchaseId(int purchaseId) {
        PurchaseId = purchaseId;
    }
}
