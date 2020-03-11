package services;

import common.ServiceObjectResponse;
import entity.ItemEntity;
import entity.PurchaseEntity;
import entity.StickerEntity;
import request.PurchaseRequest;

import java.util.List;

public interface IPurchaseService {
    ServiceObjectResponse<PurchaseEntity> create(PurchaseRequest purchase);
    ServiceObjectResponse<List<PurchaseEntity>> getAll();
    ServiceObjectResponse<PurchaseEntity> getById(int id);
}
