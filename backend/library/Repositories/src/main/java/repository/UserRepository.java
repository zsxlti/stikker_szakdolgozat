package repository;

import common.DBConnection;
import entity.UserEntity;
import org.springframework.stereotype.Service;
import repositories.IUserRepository;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

@Service
public class UserRepository implements IUserRepository
{
    public UserEntity create(UserEntity user) throws Exception
    {
        Connection connection = DBConnection.getConnection();

        String SQL = "{ CALL UserCreate(?, ?, ?, ?, ?) }";

        CallableStatement  stmt = connection.prepareCall(SQL);
        stmt.setInt(1, user.Id);
        stmt.setString(2, user.UniqID);
        stmt.setString(3, user.Email);
        stmt.setString(4, user.Password);
        stmt.setString(5, user.Role);


        ResultSet resultSets  = stmt.executeQuery();
        if (resultSets.next())
        {
            user.Id = resultSets.getInt(1);
        }


        return  user;
    }

    public UserEntity findByUniqID(String uniqID) throws Exception
    {
        UserEntity user = null;

        Connection connection = DBConnection.getConnection();

        String SQL = "{ CALL UserFindByUniqID(?) }";
        CallableStatement stmt = connection.prepareCall(SQL);
        stmt.setString("paramUniqID", uniqID);

        ResultSet resultSets = stmt.executeQuery();

        // Iterate through the data in the result set.
        while (resultSets.next())
        {
            user = MapUser(resultSets);
        }

        return  user;
    }

    public UserEntity findByCredentials(String email, String password) throws Exception
    {
        UserEntity user = null;

        Connection connection = DBConnection.getConnection();

        String SQL = "{ CALL UserFindByCredentials(?, ?) }";
        CallableStatement stmt = connection.prepareCall(SQL);
        stmt.setString("paramEmail", email);
        stmt.setString("paramPassword", password);

        ResultSet resultSets = stmt.executeQuery();

        // Iterate through the data in the result set.
        while (resultSets.next())
        {
            user = MapUser(resultSets);
        }

        return  user;
    }

    @Override
    public UserEntity findByEmail(String email) throws Exception
    {
        UserEntity user = null;

        Connection connection = DBConnection.getConnection();

        String SQL = "{ CALL UserFindByEmail(?) }";
        CallableStatement stmt = connection.prepareCall(SQL);
        stmt.setString("paramEmail", email);

        ResultSet resultSets = stmt.executeQuery();

        // Iterate through the data in the result set.
        while (resultSets.next())
        {
            user = MapUser(resultSets);
        }

        return  user;
    }


    public UserEntity update(UserEntity user) throws Exception
    {
        Connection connection = DBConnection.getConnection();

        String SQL = "{ CALL UserUpdate(?, ?, ?, ?, ?) }";
        CallableStatement stmt = connection.prepareCall(SQL);
        stmt.setInt("paramId", user.Id);
        stmt.setString("paramUniqID", user.UniqID);
        stmt.setString("paramEmail", user.Email);
        stmt.setString("paramPassword", user.Password);
        stmt.setString("paramRole", user.Role);



        int affectedRows  = stmt.executeUpdate();

        //ellenorizzuk, hogy van-e modositott rekord
        if (affectedRows == 0)
        {
            throw new SQLException("The update of the record was unsuccessful!");
        }

        return user;
    }

    public boolean delete(int id) throws Exception
    {
        Connection connection = DBConnection.getConnection();

        String SQL = "{ CALL UserDelete(?) }";
        CallableStatement stmt = connection.prepareCall(SQL);
        stmt.setInt("paramId", id);

        int affectedRows  = stmt.executeUpdate();

        return  affectedRows == 1 ? true : false;
    }
    private UserEntity MapUser(ResultSet dataSet) throws SQLException
    {
        UserEntity user = new UserEntity();
        user.Id = Integer.parseInt(dataSet.getString("Id"));
        user.UniqID = dataSet.getString("UniqID");
        user.Email = dataSet.getString("Email");
        user.Password = dataSet.getString("Password");
        user.Role = dataSet.getString("Role");

        return  user;
    }
}
