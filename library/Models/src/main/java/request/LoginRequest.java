package request;

import io.swagger.annotations.ApiModel;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

@ApiModel
public class LoginRequest
{
    @NotBlank(message = "Email is mandatory")
    @NotEmpty(message = "Email can't be empty")
    public String Email;

    @NotBlank(message = "Password is mandatory")
    @NotEmpty(message = "Password can't be empty")
    public String Password;

    public String getEmail()
    {
        return Email;
    }

    public void setEmail(String email)
    {
        Email = email;
    }

    public String getPassword()
    {
        return Password;
    }

    public void setPassword(String password)
    {
        Password = password;
    }
}
