package response;

import entity.UserEntity;
import io.swagger.annotations.ApiModel;

@ApiModel
public class UserResponse
{
    public String UniqID;
    public String Email;
    public String Role;

    public UserResponse()
    {}

    public UserResponse(String uniqID, String email, String role)
    {
        UniqID = uniqID;
        Email = email;
        Role = role;
    }

    public UserResponse(UserEntity user)
    {
        if(user == null)
        {
            return;
        }

        UniqID = user.UniqID;
        Email = user.Email;
        Role = user.Role;
    }
}
