package entity;

import io.swagger.annotations.ApiModel;
import request.RegisterRequest;

@ApiModel
public class UserEntity
{
    public int Id;
    public String UniqID;
    public String Email;
    public String Password;
    public String Role;

    public UserEntity() {
    }

    public UserEntity(int id, String uniqID, String email, String password, String role ) {
        Id = id;
        UniqID = uniqID;
        Email = email;
        Password = password;
        Role = role;
    }

    public UserEntity(RegisterRequest data)
    {
        Email = data.Email;
        Password =  data.Password;
    }

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getUniqID() {
        return UniqID;
    }

    public void setUniqID(String uniqID) {
        UniqID = uniqID;
    }

    public String getEmail() {
        return Email;
    }

    public void setEmail(String email) {
        Email = email;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }

    public String getRole() {
        return Role;
    }

    public void setRole(String role) {
        Role = role;
    }
}
