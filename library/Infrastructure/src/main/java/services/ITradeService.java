package services;

import common.ServiceObjectResponse;
import entity.TradeEntity;

import java.util.List;

public interface ITradeService {
    ServiceObjectResponse<TradeEntity> create(TradeEntity trade);
    ServiceObjectResponse<TradeEntity> update(TradeEntity trade);
    ServiceObjectResponse delete(int id);
    ServiceObjectResponse<List<TradeEntity>> getAll();
    ServiceObjectResponse<TradeEntity> getById(int id);
}
