package service;

import common.ServiceObjectResponse;
import entity.TradeEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repositories.ITradeRepository;
import services.ITradeService;

import java.util.List;

@Service
public class TradeService implements ITradeService {

    @Autowired
    ITradeRepository _tradeRepository;

    @Override
    public ServiceObjectResponse<TradeEntity> create(TradeEntity trade)
    {
        ServiceObjectResponse<TradeEntity> response = new ServiceObjectResponse<>();

        try
        {
            TradeEntity data = _tradeRepository.create(trade);

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
    public ServiceObjectResponse<TradeEntity> update(TradeEntity trade)
    {
        ServiceObjectResponse<TradeEntity> response = new ServiceObjectResponse<>();

        try
        {
            TradeEntity data = _tradeRepository.update(trade);

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
            boolean success = _tradeRepository.delete(id);

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
    public ServiceObjectResponse<List<TradeEntity>> getAll()
    {
        ServiceObjectResponse<List<TradeEntity>> response = new ServiceObjectResponse<>();

        try
        {
            List<TradeEntity> trades = _tradeRepository.getAll();

            response.setObject(trades);
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
    public ServiceObjectResponse<TradeEntity> getById(int id)
    {
        ServiceObjectResponse<TradeEntity> response = new ServiceObjectResponse<>();

        try
        {
            TradeEntity trade = _tradeRepository.getById(id);

            response.setObject(trade);
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
