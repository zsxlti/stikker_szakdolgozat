package repository;

import common.DBConnection;
import entity.PurchaseEntity;
import org.springframework.stereotype.Service;
import repositories.IPurchaseRepository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class PurchaseRepository implements IPurchaseRepository {
    public PurchaseEntity create(PurchaseEntity purchase) throws Exception
    {
        Connection connection = DBConnection.getConnection();

        String SQL = "{ CALL PurchaseCreate(?, ?, ?) }";

        CallableStatement stmt = connection.prepareCall(SQL);
        stmt.setInt(1, purchase.Id);
        stmt.setString(2, purchase.customerID);
        stmt.setDate(3, (Date) purchase.date);




        ResultSet resultSets  = stmt.executeQuery();
        if (resultSets.next())
        {
            purchase.Id = resultSets.getInt(1);
        }
        return purchase;
    }
    public List<PurchaseEntity> getAll() throws Exception
    {
        List<PurchaseEntity> purchaseEntities = new ArrayList<>();
        PurchaseEntity purchase = null;

        Connection connection = DBConnection.getConnection();

        String SQL = "{ CALL PurchaseGetAll() }";
        CallableStatement stmt = connection.prepareCall(SQL);

        ResultSet resultSets = stmt.executeQuery();

        // Iterate through the data in the result set.
        while (resultSets.next())
        {
            purchase = MapPurchase(resultSets);
            purchaseEntities.add(purchase);
        }

        return purchaseEntities;
    }

    public PurchaseEntity getById(int id) throws Exception
    {
        PurchaseEntity purchase = null;

        Connection connection = DBConnection.getConnection();

        String SQL = "{ CALL PurchaseGetByID(?) }";
        CallableStatement stmt = connection.prepareCall(SQL);
        stmt.setInt("paramId", id);

        ResultSet resultSets = stmt.executeQuery();

        // Iterate through the data in the result set.
        while (resultSets.next())
        {
            purchase = MapPurchase(resultSets);
        }

        return purchase;
    }




    private PurchaseEntity MapPurchase(ResultSet dataSet) throws SQLException
    {
        PurchaseEntity purchase = new PurchaseEntity();
        purchase.Id = Integer.parseInt(dataSet.getString("Id"));
        purchase.customerID = dataSet.getString("customerID");
        purchase.date = Date.valueOf(dataSet.getString("date"));

        return purchase;
    }
}
