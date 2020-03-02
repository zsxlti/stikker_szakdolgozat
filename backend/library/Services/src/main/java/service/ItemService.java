package service;

import common.ServiceObjectResponse;
import entity.ItemEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repositories.IItemRepository;
import services.IItemService;

import java.util.List;

@Service
public class ItemService implements IItemService {

    @Autowired
    IItemRepository _itemRepository;

    @Override
    public ServiceObjectResponse<List<ItemEntity>> getAll()
    {
        ServiceObjectResponse<List<ItemEntity>> response = new ServiceObjectResponse<>();

        try
        {
            List<ItemEntity> items = _itemRepository.getAll();

            response.setObject(items);
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
    public ServiceObjectResponse<ItemEntity> update(ItemEntity item)
    {
        ServiceObjectResponse<ItemEntity> response = new ServiceObjectResponse<>();

        try
        {
            ItemEntity data = _itemRepository.update(item);

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
            boolean success = _itemRepository.delete(id);

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
    public ServiceObjectResponse<ItemEntity> getById(int id)
    {
        ServiceObjectResponse<ItemEntity> response = new ServiceObjectResponse<>();

        try
        {
            ItemEntity item = _itemRepository.getById(id);

            response.setObject(item);
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
