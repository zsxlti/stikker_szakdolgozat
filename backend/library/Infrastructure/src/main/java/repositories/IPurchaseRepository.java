package repositories;

import entity.PurchaseEntity;

import java.util.List;

public interface IPurchaseRepository {
    PurchaseEntity create(PurchaseEntity purchase) throws Exception;
    List<PurchaseEntity> getAll() throws Exception;
    PurchaseEntity getById(int id) throws Exception;
}
