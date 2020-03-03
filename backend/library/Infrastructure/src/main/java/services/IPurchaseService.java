package services;

import common.ServiceObjectResponse;
import entity.ItemEntity;
import entity.PurchaseEntity;

import java.util.List;

public interface IPurchaseService {
    ServiceObjectResponse<PurchaseEntity> create(PurchaseEntity purchase);
    ServiceObjectResponse<PurchaseEntity> update(PurchaseEntity purchase);
    ServiceObjectResponse delete(int id);
    ServiceObjectResponse<List<PurchaseEntity>> getAll();
    ServiceObjectResponse<PurchaseEntity> getById(int id);
    ServiceObjectResponse<List<ItemEntity>> getAllItems();
    ServiceObjectResponse<ItemEntity> updateItem(ItemEntity item);
    ServiceObjectResponse deleteItem(int id);
    ServiceObjectResponse<ItemEntity> getItemById(int id);
}
