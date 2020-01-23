package entity;

public class StickerEntity {
    public int Id;
    public String Description;
    public String URL;
    public String Wanted;
    public String Offered;
    public String ProfileID;

    public StickerEntity() {
    }

    public StickerEntity(int id, String description, String URL, String wanted, String offered, String profileID) {
        Id = id;
        Description = description;
        this.URL = URL;
        Wanted = wanted;
        Offered = offered;
        ProfileID = profileID;
    }

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }

    public String getURL() {
        return URL;
    }

    public void setURL(String URL) {
        this.URL = URL;
    }

    public String getWanted() {
        return Wanted;
    }

    public void setWanted(String wanted) {
        Wanted = wanted;
    }

    public String getOffered() {
        return Offered;
    }

    public void setOffered(String offered) {
        Offered = offered;
    }

    public String getProfileID() {
        return ProfileID;
    }

    public void setProfileID(String profileID) {
        ProfileID = profileID;
    }
}
