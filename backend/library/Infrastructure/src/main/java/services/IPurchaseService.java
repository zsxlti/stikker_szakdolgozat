package services;

import common.ServiceObjectResponse;
import entity.PurchaseEntity;

import java.util.List;

public interface IPurchaseService {
    ServiceObjectResponse<PurchaseEntity> create(PurchaseEntity purchase);
    ServiceObjectResponse<PurchaseEntity> update(PurchaseEntity purchase);
    ServiceObjectResponse delete(int id);
    ServiceObjectResponse<List<PurchaseEntity>> getAll();
    ServiceObjectResponse<PurchaseEntity> getById(int id);
}
