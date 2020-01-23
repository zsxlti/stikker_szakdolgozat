package response;

import entity.ProfileEntity;
import io.swagger.annotations.ApiModel;

import java.time.LocalDate;
import java.util.Date;

@ApiModel
public class ProfileResponse {

    public String Name;
    public LocalDate BirthDate;

    public ProfileResponse() {
    }

    public ProfileResponse(String name, LocalDate birthDate) {
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
