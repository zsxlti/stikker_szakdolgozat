package repositories;

import entity.ProfileEntity;

import java.util.List;

public interface IProfileRepository {

    ProfileEntity create(ProfileEntity profile) throws Exception;
    List<ProfileEntity> getAll() throws Exception;
    ProfileEntity getByName(String name) throws Exception;
    ProfileEntity update(ProfileEntity profile) throws Exception;
    boolean delete(String id) throws Exception;
    ProfileEntity getById(String id) throws Exception;



}
