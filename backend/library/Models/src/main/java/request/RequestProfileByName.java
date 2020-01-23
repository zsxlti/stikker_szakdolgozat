package request;

import io.swagger.annotations.ApiModel;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

@ApiModel
public class RequestProfileByName {
    @NotBlank(message = "Name is mandatory")
    @NotEmpty(message = "Name can't be empty")
    public String Name;
}
