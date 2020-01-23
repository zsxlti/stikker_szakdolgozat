package response;

import entity.ProfileEntity;
import io.swagger.annotations.ApiModel;

import java.util.Date;

@ApiModel
public class ProfileResponse {

    public String Name;
    public Date BirthDate;

    public ProfileResponse() {
    }

    public ProfileResponse(String name, Date birthDate) {
        Name = name;
        BirthDate = birthDate;
    }

    public ProfileResponse(ProfileEntity profile)
    {
        if(profile == null)
        {
            return;
        }

        Name = profile.Name;
        BirthDate=profile.BirthDate;
    }
}
