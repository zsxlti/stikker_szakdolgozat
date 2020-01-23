package repository;

import common.DBConnection;
import entity.ProfileEntity;
import org.springframework.stereotype.Service;
import repositories.IProfileRepository;


import java.sql.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProfileRepository implements IProfileRepository {
    public ProfileEntity create(ProfileEntity profile) throws Exception
    {
        Connection connection = DBConnection.getConnection();

        String SQL = "{ CALL ProfileCreate(?, ?, ?) }";

        CallableStatement stmt = connection.prepareCall(SQL);
        stmt.setString(1, profile.Id);
        stmt.setString(2, profile.Name);
        stmt.setDate(3, Date.valueOf(profile.BirthDate));



        ResultSet resultSets  = stmt.executeQuery();
        if (resultSets.next())
        {
            profile.Id = resultSets.getString(1);
        }


        return profile;
    }

    public List<ProfileEntity> getAll() throws Exception
    {
        List<ProfileEntity> profileEntities = new ArrayList<>();
        ProfileEntity profile = null;

        Connection connection = DBConnection.getConnection();

        String SQL = "{ CALL ProfileGetAll() }";
        CallableStatement stmt = connection.prepareCall(SQL);

        ResultSet resultSets = stmt.executeQuery();

        // Iterate through the data in the result set.
        while (resultSets.next())
        {
            profile = MapProfile(resultSets);
            profileEntities.add(profile);
        }

        return profileEntities;
    }

    public ProfileEntity getByName(String name) throws Exception
    {
        ProfileEntity profile = null;

        Connection connection = DBConnection.getConnection();

        String SQL = "{ CALL ProfileFindByName(?) }";
        CallableStatement stmt = connection.prepareCall(SQL);
        stmt.setString("paramName", name);

        ResultSet resultSets = stmt.executeQuery();

        // Iterate through the data in the result set.
        while (resultSets.next())
        {
            profile = MapProfile(resultSets);
        }

        return profile;
    }


    public ProfileEntity update(ProfileEntity profile) throws Exception
    {
        Connection connection = DBConnection.getConnection();

        String SQL = "{ CALL ProfileUpdate(?, ?, ?) }";
        CallableStatement stmt = connection.prepareCall(SQL);
        stmt.setString("paramId", profile.Id);
        stmt.setString("paramName", profile.Name);
        stmt.setDate("paramBirthDate", Date.valueOf(profile.BirthDate));

        int affectedRows  = stmt.executeUpdate();

        //ellenorizzuk, hogy van-e modositott rekord
        if (affectedRows == 0)
        {
            throw new SQLException("The update of the record was unsuccessful!");
        }

        return profile;
    }

    public boolean delete(String id) throws Exception
    {
        Connection connection = DBConnection.getConnection();

        String SQL = "{ CALL ProfileDelete(?) }";
        CallableStatement stmt = connection.prepareCall(SQL);
        stmt.setString("paramId", id);

        int affectedRows  = stmt.executeUpdate();

        return  affectedRows == 1 ? true : false;
    }

    public ProfileEntity getById(String id) throws Exception
    {
        ProfileEntity profile = null;

        Connection connection = DBConnection.getConnection();

        String SQL = "{ CALL ProfileGetByID(?) }";
        CallableStatement stmt = connection.prepareCall(SQL);
        stmt.setString("paramId", id);

        ResultSet resultSets = stmt.executeQuery();

        // Iterate through the data in the result set.
        while (resultSets.next())
        {
            profile = MapProfile(resultSets);
        }

        return profile;
    }



    private ProfileEntity MapProfile(ResultSet dataSet) throws SQLException
    {
        ProfileEntity profile = new ProfileEntity();
        profile.Id = dataSet.getString("Id");
        profile.Name = dataSet.getString("Name");
        profile.BirthDate = LocalDate.parse(dataSet.getString("BirthDate"));
        return profile;
    }
}
