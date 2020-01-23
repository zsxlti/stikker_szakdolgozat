package services;

import common.ServiceObjectResponse;
import entity.StickerEntity;

import java.util.List;

public interface IStickerService {
    ServiceObjectResponse<StickerEntity> create(StickerEntity sticker);
    ServiceObjectResponse<StickerEntity> update(StickerEntity sticker);
    ServiceObjectResponse delete(int id);
    ServiceObjectResponse<List<StickerEntity>> getAll();
    ServiceObjectResponse<StickerEntity> getById(int id);
}
