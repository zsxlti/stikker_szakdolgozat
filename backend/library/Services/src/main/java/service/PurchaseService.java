package service;

import common.ServiceObjectResponse;
import entity.PurchaseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repositories.IPurchaseRepository;
import services.IPurchaseService;

import java.util.List;

@Service
public class PurchaseService implements IPurchaseService {

    @Autowired
    IPurchaseRepository _purchaseRepository;

    @Override
    public ServiceObjectResponse<PurchaseEntity> create(PurchaseEntity purchase)
    {
        ServiceObjectResponse<PurchaseEntity> response = new ServiceObjectResponse<>();

        try
        {
            PurchaseEntity data = _purchaseRepository.create(purchase);

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
    public ServiceObjectResponse<PurchaseEntity> update(PurchaseEntity purchase)
    {
        ServiceObjectResponse<PurchaseEntity> response = new ServiceObjectResponse<>();

        try
        {
            PurchaseEntity data = _purchaseRepository.update(purchase);

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
            boolean success = _purchaseRepository.delete(id);

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

}
