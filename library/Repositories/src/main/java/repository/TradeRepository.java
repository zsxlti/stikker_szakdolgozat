package repository;

import common.DBConnection;
import entity.TradeEntity;
import org.springframework.stereotype.Service;
import repositories.ITradeRepository;

import javax.xml.crypto.Data;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class TradeRepository implements ITradeRepository {
    public TradeEntity create(TradeEntity trade) throws Exception
    {
        Connection connection = DBConnection.getConnection();

        String SQL = "{ CALL TradeCreate(?, ?, ?, ? ,?) }";

        CallableStatement stmt = connection.prepareCall(SQL);
        stmt.setInt(1, trade.Id);
        stmt.setString(2, trade.sellerID);
        stmt.setString(3, trade.customerID);
        stmt.setInt(4, trade.stickerID);
        stmt.setDate(5, (Date) trade.date);




        ResultSet resultSets  = stmt.executeQuery();
        if (resultSets.next())
        {
            trade.Id = resultSets.getInt(1);
        }
        return trade;
    }
    public TradeEntity update(TradeEntity trade) throws Exception
    {
        Connection connection = DBConnection.getConnection();

        String SQL = "{ CALL TradeUpdate(?, ?, ?, ?, ?) }";
        CallableStatement stmt = connection.prepareCall(SQL);
        stmt.setInt("paramId", trade.Id);
        stmt.setString("paramSellerID", trade.sellerID);
        stmt.setString("paramCustomerID", trade.customerID);
        stmt.setInt("paramStickerID",trade.stickerID );
        stmt.setDate("paramDate", (Date) trade.date);



        int affectedRows  = stmt.executeUpdate();

        //ellenorizzuk, hogy van-e modositott rekord
        if (affectedRows == 0)
        {
            throw new SQLException("The update of the record was unsuccessful!");
        }

        return trade;
    }
    public boolean delete(int id) throws Exception
    {
        Connection connection = DBConnection.getConnection();

        String SQL = "{ CALL TradeDelete(?) }";
        CallableStatement stmt = connection.prepareCall(SQL);
        stmt.setInt("paramId", id);

        int affectedRows  = stmt.executeUpdate();

        return  affectedRows == 1 ? true : false;
    }

    public List<TradeEntity> getAll() throws Exception
    {
        List<TradeEntity> tradeEntities = new ArrayList<>();
        TradeEntity trade = null;

        Connection connection = DBConnection.getConnection();

        String SQL = "{ CALL TradeGetAll() }";
        CallableStatement stmt = connection.prepareCall(SQL);

        ResultSet resultSets = stmt.executeQuery();

        // Iterate through the data in the result set.
        while (resultSets.next())
        {
            trade = MapTrade(resultSets);
            tradeEntities.add(trade);
        }

        return tradeEntities;
    }

    public TradeEntity getById(int id) throws Exception
    {
        TradeEntity trade = null;

        Connection connection = DBConnection.getConnection();

        String SQL = "{ CALL TradeGetByID(?) }";
        CallableStatement stmt = connection.prepareCall(SQL);
        stmt.setInt("paramId", id);

        ResultSet resultSets = stmt.executeQuery();

        // Iterate through the data in the result set.
        while (resultSets.next())
        {
            trade = MapTrade(resultSets);
        }

        return trade;
    }




    private TradeEntity MapTrade(ResultSet dataSet) throws SQLException
    {
        TradeEntity trade = new TradeEntity();
        trade.Id = Integer.parseInt(dataSet.getString("Id"));
        trade.sellerID= dataSet.getString("sellerID");
        trade.customerID = dataSet.getString("customerID");
        trade.stickerID = Integer.parseInt(dataSet.getString("stickerID"));
        trade.date = Date.valueOf(dataSet.getString("date"));

        return trade;
    }
}
