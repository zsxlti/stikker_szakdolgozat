package entity;

import request.RegisterRequest;

import java.time.LocalDate;

public class ProfileEntity {
    public String Id;
    public String Name;
    public LocalDate BirthDate;

    public ProfileEntity() {
    }

    public ProfileEntity(String id, String name, LocalDate birthDate) {
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

    public LocalDate getBirthDate() {
        return BirthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        BirthDate = birthDate;
    }
}
