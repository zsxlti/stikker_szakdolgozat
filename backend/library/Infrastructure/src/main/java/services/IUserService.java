package services;

import common.ServiceObjectResponse;
import entity.UserEntity;
import request.RegisterRequest;
import response.UserResponse;

public interface IUserService
{
    ServiceObjectResponse<UserEntity> create(RegisterRequest user) throws Exception;
    ServiceObjectResponse<UserEntity> findByUniqID(String uniqID) throws Exception;
    ServiceObjectResponse<UserEntity> findByCredentials(String email, String password) throws Exception;
    ServiceObjectResponse<UserEntity> findByEmail(String email) throws Exception;
    ServiceObjectResponse<UserResponse> whoAmI(String email) throws Exception;
    ServiceObjectResponse<UserEntity> update(UserEntity user);
    ServiceObjectResponse delete(int id);
}
