package controllers;

import common.ServiceObjectResponse;
import entity.UserEntity;
import enums.Role;
import exception.CustomException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import request.LoginRequest;
import request.RegisterRequest;
import response.TokenResponse;
import security.JwtTokenProvider;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import services.IUserService;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

/*
swagger: http://localhost:8080/v2/api-docs?tags=security
*/

@RestController
@Api(tags = "security", value = "SecurityService")
public class SecurityController
{
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private IUserService _userService;

    @ApiOperation(value = "login", nickname = "login")
    @PostMapping("/api/security/login")
    @ResponseBody
    public TokenResponse Login(@RequestBody @Valid LoginRequest data) throws Exception
    {
        ServiceObjectResponse<UserEntity> request = _userService.findByCredentials(data.Email, data.Password);

        if(!request.getIsSuccess())
        {
            throw new Exception(request.getMessage());
        }
        else if(request.getIsSuccess() && request.getObject() == null)
        {
            throw new Exception("No user found with given credentials!");
        }

        UserEntity user = request.getObject();

        try
        {
            UsernamePasswordAuthenticationToken authenticationData = new UsernamePasswordAuthenticationToken(user.UniqID, data.Password);
            Authentication authenticationResult = authenticationManager.authenticate(authenticationData);

            if(!authenticationResult.isAuthenticated())
            {
                throw new Exception("Authentication failed!");
            }

            List<Role> roles = new ArrayList<>();

            roles.add(enums.Role.valueOf(user.Role));

            return new TokenResponse(jwtTokenProvider.createToken(user.UniqID, roles));
        }
        catch (AuthenticationException e)
        {
            throw new CustomException("Invalid username/password supplied", HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    @ApiOperation(value = "register", nickname = "register")
    @PostMapping("/api/security/register")
    @ResponseBody
    public TokenResponse Register(@RequestBody @Valid RegisterRequest data) throws Exception
    {
        ServiceObjectResponse<UserEntity> request = _userService.create(data);

        if(!request.getIsSuccess())
        {
            throw new CustomException(request.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
        }

        UserEntity user = request.getObject();

        List<Role> roles = new ArrayList<>();
        roles.add(enums.Role.valueOf(user.Role));

        return new TokenResponse(jwtTokenProvider.createToken(user.UniqID, roles));
    }
}
