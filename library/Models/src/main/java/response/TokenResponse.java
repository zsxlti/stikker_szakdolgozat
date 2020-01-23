package response;

import io.swagger.annotations.ApiModel;

@ApiModel
public class TokenResponse
{
    public String Token;

    public TokenResponse()
    {
    }

    public TokenResponse(String token)
    {
        Token = token;
    }
}
