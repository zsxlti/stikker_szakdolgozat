package response;

import entity.ItemEntity;

public class ItemResponse {
    public int StickerId;
    public int PurchaseId;

    public ItemResponse() {
    }

    public ItemResponse(int stickerId, int purchaseId) {
        StickerId = stickerId;
        PurchaseId = purchaseId;
    }

    public ItemResponse(ItemEntity item)
    {
        if (item==null)
        {
            return;
        }
        StickerId=item.StickerId;
        PurchaseId=item.PurchaseId;
    }
}
