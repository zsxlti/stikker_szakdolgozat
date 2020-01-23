package entity;

import request.RegisterRequest;

import java.util.Date;

public class ProfileEntity {
    public String Id;
    public String Name;
    public Date BirthDate;

    public ProfileEntity() {
    }

    public ProfileEntity(String id, String name, Date birthDate) {
        Id = id;
        Name = name;
        BirthDate = birthDate;
    }

    public ProfileEntity(String uniqID,RegisterRequest data)
    {
        Id=uniqID;
        Name=data.Name;
        BirthDate=data.BirthDate;
    }

    public String getId() {
        return Id;
    }

    public void setId(String id) {
        Id = id;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public Date getBirthDate() {
        return BirthDate;
    }

    public void setBirthDate(Date birthDate) {
        BirthDate = birthDate;
    }
}
