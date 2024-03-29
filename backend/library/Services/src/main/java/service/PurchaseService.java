package service;

import common.ServiceObjectResponse;
import entity.ItemEntity;
import entity.PurchaseEntity;
import entity.StickerEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repositories.IItemRepository;
import repositories.IPurchaseRepository;
import request.PurchaseRequest;
import services.IPurchaseService;

import java.util.List;

@Service
public class PurchaseService implements IPurchaseService {

    @Autowired
    IPurchaseRepository _purchaseRepository;

    @Autowired
    IItemRepository _itemRepository;

    @Override
    public ServiceObjectResponse<PurchaseEntity> create(PurchaseRequest purchase)
    {
        ServiceObjectResponse<PurchaseEntity> response = new ServiceObjectResponse<>();

        try
        {
            PurchaseEntity data = _purchaseRepository.create(purchase.purchase);
            for (StickerEntity var: purchase.stickers) {
                ItemEntity item=new ItemEntity(var.Id,data.Id);
                item=_itemRepository.create(item);
            }
            
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
    public ServiceObjectResponse<List<PurchaseEntity>> getAll()
    {
        ServiceObjectResponse<List<PurchaseEntity>> response = new ServiceObjectResponse<>();

        try
        {
            List<PurchaseEntity> purchases = _purchaseRepository.getAll();

            response.setObject(purchases);
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
    public ServiceObjectResponse<PurchaseEntity> getById(int id)
    {
        ServiceObjectResponse<PurchaseEntity> response = new ServiceObjectResponse<>();

        try
        {
            PurchaseEntity purchase = _purchaseRepository.getById(id);

            response.setObject(purchase);
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
    /*@Override
    public ServiceObjectResponse<List<ItemEntity>> getAllItems()
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
    public ServiceObjectResponse<ItemEntity> updateItem(ItemEntity item)
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
    public ServiceObjectResponse deleteItem(int id)
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
    public ServiceObjectResponse<ItemEntity> getItemById(int id)
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
    }*/
}
