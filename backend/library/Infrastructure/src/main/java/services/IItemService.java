package services;

import common.ServiceObjectResponse;
import entity.ItemEntity;

import java.util.List;

public interface IItemService {
    ServiceObjectResponse<List<ItemEntity>> getAll();
    ServiceObjectResponse<ItemEntity> update(ItemEntity item);
    ServiceObjectResponse delete(int id);
    ServiceObjectResponse<ItemEntity> getById(int id);
}
