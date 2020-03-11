package request;

import entity.PurchaseEntity;
import entity.StickerEntity;

public class PurchaseRequest {
    public PurchaseEntity purchase;
    public StickerEntity[] stickers;

    public PurchaseRequest() {
    }

    public PurchaseRequest(PurchaseEntity purchase, StickerEntity[] stickers) {
        this.purchase = purchase;
        this.stickers = stickers;
    }
}
