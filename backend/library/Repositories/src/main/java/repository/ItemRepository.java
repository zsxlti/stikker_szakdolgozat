package repository;

import common.DBConnection;
import entity.ItemEntity;
import org.springframework.stereotype.Service;
import repositories.IItemRepository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class ItemRepository implements IItemRepository {
    public ItemEntity create(ItemEntity item) throws Exception
    {
        Connection connection = DBConnection.getConnection();

        String SQL = "{ CALL ItemCreate(?, ?, ?) }";

        CallableStatement stmt = connection.prepareCall(SQL);
        stmt.setInt(1, item.Id);
        stmt.setInt(2,item.StickerId);
        stmt.setInt(3, item.PurchaseId);

        stmt.execute();

        return item;
    }

    public List<ItemEntity> getAll() throws Exception
    {
        List<ItemEntity> itemEntities = new ArrayList<>();
        ItemEntity item = null;

        Connection connection = DBConnection.getConnection();

        String SQL = "{ CALL ItemGetAll() }";
        CallableStatement stmt = connection.prepareCall(SQL);

        ResultSet resultSets = stmt.executeQuery();

        // Iterate through the data in the result set.
        while (resultSets.next())
        {
            item = MapItem(resultSets);
            itemEntities.add(item);
        }

        return itemEntities;
    }

    public ItemEntity update(ItemEntity item) throws Exception
    {
        Connection connection = DBConnection.getConnection();

        String SQL = "{ CALL ItemUpdate(?, ?, ?) }";
        CallableStatement stmt = connection.prepareCall(SQL);
        stmt.setInt("paramId", item.Id);
        stmt.setInt("paramStickerId", item.StickerId);
        stmt.setInt("paramPurchaseId", item.PurchaseId);

        int affectedRows  = stmt.executeUpdate();

        //ellenorizzuk, hogy van-e modositott rekord
        if (affectedRows == 0)
        {
            throw new SQLException("The update of the record was unsuccessful!");
        }

        return item;
    }

    public boolean delete(int id) throws Exception
    {
        Connection connection = DBConnection.getConnection();

        String SQL = "{ CALL ItemDelete(?) }";
        CallableStatement stmt = connection.prepareCall(SQL);
        stmt.setInt("paramId", id);

        int affectedRows  = stmt.executeUpdate();

        return  affectedRows == 1 ? true : false;
    }

    public ItemEntity getById(int id) throws Exception
    {
        ItemEntity item = null;

        Connection connection = DBConnection.getConnection();

        String SQL = "{ CALL ItemGetByID(?) }";
        CallableStatement stmt = connection.prepareCall(SQL);
        stmt.setInt("paramId", id);

        ResultSet resultSets = stmt.executeQuery();

        // Iterate through the data in the result set.
        while (resultSets.next())
        {
            item = MapItem(resultSets);
        }

        return item;
    }



    private ItemEntity MapItem(ResultSet dataSet) throws SQLException
    {
        ItemEntity item = new ItemEntity();
        item.Id = Integer.parseInt(dataSet.getString("Id"));
        item.StickerId = Integer.parseInt(dataSet.getString("StickerId"));
        item.PurchaseId = Integer.parseInt(dataSet.getString("PurchaseId"));
        return item;
    }

}
