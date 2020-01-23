package repositories;

import entity.TradeEntity;

import java.util.List;

public interface ITradeRepository {
    TradeEntity create(TradeEntity trade) throws Exception;
    TradeEntity update(TradeEntity trade) throws Exception;
    boolean delete(int id) throws Exception;
    List<TradeEntity> getAll() throws Exception;
    TradeEntity getById(int id) throws Exception;
}
