package repositories;

import entity.UserEntity;

public interface IUserRepository
{
    UserEntity create(UserEntity user) throws Exception;
    UserEntity findByUniqID(String uniqID) throws Exception;
    UserEntity findByCredentials(String email, String password) throws Exception;
    UserEntity findByEmail(String email) throws Exception;
    UserEntity update(UserEntity user) throws Exception;
    boolean delete(int id) throws Exception;
}
