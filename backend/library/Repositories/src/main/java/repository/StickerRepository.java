package repository;

import common.DBConnection;
import entity.StickerEntity;
import org.springframework.stereotype.Service;
import repositories.IStickerRepository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class StickerRepository implements IStickerRepository {

    public StickerEntity create(StickerEntity sticker) throws Exception {
        Connection connection = DBConnection.getConnection();

        String SQL = "{ CALL StickerCreate(?, ?, ?, ? ,?, ?) }";

        CallableStatement stmt = connection.prepareCall(SQL);
        stmt.setInt(1, sticker.Id);
        stmt.setString(2, sticker.Description);
        stmt.setString(3, sticker.URL);
        stmt.setString(4, sticker.Wanted);
        stmt.setString(5, sticker.Offered);
        stmt.setString(6, sticker.ProfileID);



        ResultSet resultSets  = stmt.executeQuery();
        if (resultSets.next())
        {
            sticker.Id = resultSets.getInt(1);
        }


        return sticker;
    }
    public StickerEntity update(StickerEntity sticker) throws Exception
    {
        Connection connection = DBConnection.getConnection();

        String SQL = "{ CALL StickerUpdate(?, ?, ?, ?, ?, ?) }";
        CallableStatement stmt = connection.prepareCall(SQL);
        stmt.setInt("paramId", sticker.Id);
        stmt.setString("paramDescription", sticker.Description);
        stmt.setString("paramURL", sticker.URL);
        stmt.setString("paramWanted", sticker.Wanted);
        stmt.setString("paramOffered", sticker.Offered);
        stmt.setString("paramProfileID", sticker.ProfileID);


        int affectedRows  = stmt.executeUpdate();

        //ellenorizzuk, hogy van-e modositott rekord
        if (affectedRows == 0)
        {
            throw new SQLException("The update of the record was unsuccessful!");
        }

        return sticker;
    }

    public boolean delete(int id) throws Exception
    {
        Connection connection = DBConnection.getConnection();

        String SQL = "{ CALL StickerDelete(?) }";
        CallableStatement stmt = connection.prepareCall(SQL);
        stmt.setInt("paramId", id);

        int affectedRows  = stmt.executeUpdate();

        return  affectedRows == 1 ? true : false;
    }

    public List<StickerEntity> getAll() throws Exception
    {
        List<StickerEntity> stickerEntities = new ArrayList<>();
        StickerEntity sticker = null;

        Connection connection = DBConnection.getConnection();

        String SQL = "{ CALL StickerGetAll() }";
        CallableStatement stmt = connection.prepareCall(SQL);

        ResultSet resultSets = stmt.executeQuery();

        // Iterate through the data in the result set.
        while (resultSets.next())
        {
            sticker = MapSticker(resultSets);
            stickerEntities.add(sticker);
        }

        return stickerEntities;
    }

    public StickerEntity getById(int id) throws Exception
    {
        StickerEntity sticker = null;

        Connection connection = DBConnection.getConnection();

        String SQL = "{ CALL StickerGetByID(?) }";
        CallableStatement stmt = connection.prepareCall(SQL);
        stmt.setInt("paramId", id);

        ResultSet resultSets = stmt.executeQuery();

        // Iterate through the data in the result set.
        while (resultSets.next())
        {
            sticker = MapSticker(resultSets);
        }

        return sticker;
    }

    private StickerEntity MapSticker(ResultSet dataSet) throws SQLException
    {
        StickerEntity sticker = new StickerEntity();
        sticker.Id = Integer.parseInt(dataSet.getString("Id"));
        sticker.Description= dataSet.getString("Description");
        sticker.URL = dataSet.getString("URL");
        sticker.Wanted = dataSet.getString("Wanted");
        sticker.Offered = dataSet.getString("Offered");
        sticker.ProfileID = dataSet.getString("ProfileID");
        return sticker;
    }


}
