package service;

import common.ServiceObjectResponse;
import entity.StickerEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repositories.IStickerRepository;
import services.IStickerService;

import java.util.List;

@Service
public class StickerService implements IStickerService {
    @Autowired
    IStickerRepository _stickerRepository;

    @Override
    public ServiceObjectResponse<StickerEntity> create(StickerEntity sticker)
    {
        ServiceObjectResponse<StickerEntity> response = new ServiceObjectResponse<>();

        try
        {
            StickerEntity data = _stickerRepository.create(sticker);

            response.setObject(data);
            response.setIsSuccess(true);
            response.setMessage("No errors.");
        }
        catch (Exception ex)
        {
            response.setIsSuccess(false);
            response.setMessage(ex.getMessage());
        }
        return response;
    }

    @Override
    public ServiceObjectResponse<StickerEntity> update(StickerEntity sticker)
    {
        ServiceObjectResponse<StickerEntity> response = new ServiceObjectResponse<>();

        try
        {
            StickerEntity data = _stickerRepository.update(sticker);

            response.setObject(data);
            response.setIsSuccess(true);
            response.setMessage("No errors.");
        }
        catch (Exception ex)
        {
            response.setIsSuccess(false);
            response.setMessage(ex.getMessage());
        }

        return response;
    }

    @Override
    public ServiceObjectResponse delete(int id)
    {
        ServiceObjectResponse response = new ServiceObjectResponse();

        try
        {
            boolean success = _stickerRepository.delete(id);

            if(!success)
            {
                throw new Exception("Record is not deleted (id: " + id + ").");
            }

            response.setIsSuccess(true);
            response.setMessage("No errors.");
        }
        catch (Exception ex)
        {
            response.setIsSuccess(false);
            response.setMessage(ex.getMessage());
        }

        return response;
    }

    @Override
    public ServiceObjectResponse<List<StickerEntity>> getAll()
    {
        ServiceObjectResponse<List<StickerEntity>> response = new ServiceObjectResponse<>();

        try
        {
            List<StickerEntity> stickers = _stickerRepository.getAll();

            response.setObject(stickers);
            response.setIsSuccess(true);
            response.setMessage("No errors.");
        }
        catch (Exception ex)
        {
            response.setIsSuccess(false);
            response.setMessage(ex.getMessage());
        }

        return response;
    }

    @Override
    public ServiceObjectResponse<StickerEntity> getById(int id)
    {
        ServiceObjectResponse<StickerEntity> response = new ServiceObjectResponse<>();

        try
        {
            StickerEntity sticker = _stickerRepository.getById(id);

            response.setObject(sticker);
            response.setIsSuccess(true);
            response.setMessage("No errors.");
        }
        catch (Exception ex)
        {
            response.setIsSuccess(false);
            response.setMessage(ex.getMessage());
        }

        return response;
    }

}
