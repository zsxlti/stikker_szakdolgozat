package repositories;

import entity.StickerEntity;

import java.util.List;

public interface IStickerRepository {
    StickerEntity create(StickerEntity sticker) throws Exception;
    StickerEntity update(StickerEntity sticker) throws Exception;
    boolean delete(int id) throws Exception;
    List<StickerEntity> getAll() throws Exception;
    StickerEntity getById(int id) throws Exception;
    
}
