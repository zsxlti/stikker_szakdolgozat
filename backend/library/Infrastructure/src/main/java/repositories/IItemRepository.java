package repositories;

import entity.ItemEntity;

import java.util.List;

public interface IItemRepository {
    ItemEntity create(ItemEntity item) throws Exception;
    List<ItemEntity> getAll() throws Exception;
    ItemEntity update(ItemEntity item) throws Exception;
    boolean delete(int id) throws Exception;
    ItemEntity getById(int id) throws Exception;
}
