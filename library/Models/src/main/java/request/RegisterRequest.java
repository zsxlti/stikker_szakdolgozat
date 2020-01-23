package request;

import io.swagger.annotations.ApiModel;
import org.joda.time.DateTime;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.time.LocalDate;
import java.util.Date;

@ApiModel
public class RegisterRequest
{
    @NotBlank(message = "Email is mandatory")
    @NotEmpty(message = "Email can't be empty")
    public String Email;

    @NotBlank(message = "Password is mandatory")
    @NotEmpty(message = "Password can't be empty")
    public String Password;

    public String Name;
    public LocalDate BirthDate;
}
