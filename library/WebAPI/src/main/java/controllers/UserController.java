package controllers;

import common.ServiceObjectResponse;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import response.UserResponse;
import security.JwtTokenProvider;
import service.UserService;

import javax.servlet.http.HttpServletRequest;

@RestController
@Api(tags = "user", value = "UserService")
public class UserController
{
    @Autowired
    private JwtTokenProvider _jwtTokenProvider;

    @Autowired
    private UserService _userService;

    @ApiOperation(value = "getUser", nickname = "getUser", tags = "getUser")
    @GetMapping("/api/user")
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
    public UserResponse GetUser(HttpServletRequest req) throws Exception
    {
        String identity = _jwtTokenProvider.getUsername(_jwtTokenProvider.resolveToken(req));

        ServiceObjectResponse<UserResponse> request = _userService.whoAmI(identity);

        if(!request.getIsSuccess())
        {
            throw new Exception(request.getMessage());
        }

        return request.getObject();
    }


}
