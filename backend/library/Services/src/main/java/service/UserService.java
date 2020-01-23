package service;

import common.ServiceObjectResponse;
import entity.ProfileEntity;
import entity.UserEntity;
import enums.Role;
import repositories.IProfileRepository;
import repositories.IUserRepository;
import request.RegisterRequest;
import response.UserResponse;
import services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.UUID;


@Service
public class UserService implements IUserService
{
    @Autowired
    IUserRepository _userRepository;

    @Autowired
    IProfileRepository _profileRepository;

    @Override
    public ServiceObjectResponse<UserEntity> create(RegisterRequest data) throws Exception
    {
        ServiceObjectResponse<UserEntity> response = new ServiceObjectResponse<>();

        try
        {
            UserEntity user = _userRepository.findByEmail(data.Email);

            if(user != null)
            {
                throw new Exception("Email already taken!");
            }

            user = new UserEntity(data);
            user.Password = passwordEncoder(data.Password);
            user.UniqID = UUID.randomUUID().toString();
            user.Role = Role.ROLE_CLIENT.toString();

            user = _userRepository.create(user);

            ProfileEntity profile=new ProfileEntity(user.UniqID,data);
            response.setIsSuccess(true);
            profile=_profileRepository.create(profile);

            response.setObject(user);
            response.setIsSuccess(true);
            response.setMessage("No errors.");
        }
        catch (Exception ex)
        {
            response.setIsSuccess(false);
            response.setMessage(ex.getMessage());
        }

        return response;
    }

    @Override
    public ServiceObjectResponse<UserEntity> findByUniqID(String uniqID) throws Exception
    {
        ServiceObjectResponse<UserEntity> response = new ServiceObjectResponse<>();

        try
        {
            UserEntity user = _userRepository.findByUniqID(uniqID);

            response.setObject(user);
            response.setIsSuccess(true);
            response.setMessage("No errors.");
        }
        catch (Exception ex)
        {
            response.setIsSuccess(false);
            response.setMessage(ex.getMessage());
        }

        return response;
    }

    @Override
    public ServiceObjectResponse<UserEntity> findByCredentials(String email, String password) throws Exception
    {
        ServiceObjectResponse<UserEntity> response = new ServiceObjectResponse<>();

        try
        {
            String hashedPassword = passwordEncoder(password);
            UserEntity user = _userRepository.findByCredentials(email, hashedPassword);

            if(user == null)
            {
                throw new Exception("Wrong credentials!");
            }

            response.setObject(user);
            response.setIsSuccess(true);
            response.setMessage("No errors.");
        }
        catch (Exception ex)
        {
            response.setIsSuccess(false);
            response.setMessage(ex.getMessage());
        }

        return response;
    }

    @Override
    public ServiceObjectResponse<UserEntity> findByEmail(String email) throws Exception
    {
        ServiceObjectResponse<UserEntity> response = new ServiceObjectResponse<>();

        try
        {
            UserEntity user = _userRepository.findByEmail(email);

            response.setObject(user);
            response.setIsSuccess(true);
            response.setMessage("No errors.");
        }
        catch (Exception ex)
        {
            response.setIsSuccess(false);
            response.setMessage(ex.getMessage());
        }

        return response;
    }

    @Override
    public ServiceObjectResponse<UserResponse> whoAmI(String email) throws Exception
    {
        ServiceObjectResponse<UserResponse> response = new ServiceObjectResponse<>();

        try
        {
            UserEntity user = _userRepository.findByUniqID(email);

            if(user == null)
            {
                throw new Exception("Can't find user!");
            }

            UserResponse whoAmI = new UserResponse(user);

            response.setObject(whoAmI);
            response.setIsSuccess(true);
            response.setMessage("No errors.");
        }
        catch (Exception ex)
        {
            response.setIsSuccess(false);
            response.setMessage(ex.getMessage());
        }

        return response;
    }

    @Override
    public ServiceObjectResponse<UserEntity> update(UserEntity user)
    {
        ServiceObjectResponse<UserEntity> response = new ServiceObjectResponse<>();

        try
        {
            UserEntity data = _userRepository.update(user);

            response.setObject(data);
            response.setIsSuccess(true);
            response.setMessage("No errors.");
        }
        catch (Exception ex)
        {
            response.setIsSuccess(false);
            response.setMessage(ex.getMessage());
        }

        return response;
    }

    @Override
    public ServiceObjectResponse delete(int id)
    {
        ServiceObjectResponse response = new ServiceObjectResponse();

        try
        {
            boolean success = _userRepository.delete(id);

            if(!success)
            {
                throw new Exception("Record is not deleted (id: " + id + ").");
            }

            response.setIsSuccess(true);
            response.setMessage("No errors.");
        }
        catch (Exception ex)
        {
            response.setIsSuccess(false);
            response.setMessage(ex.getMessage());
        }

        return response;
    }

    private String passwordEncoder(String password) throws Exception
    {
        String secret = Base64.getEncoder().encodeToString(password.getBytes());

        return  secret;
    }

}
