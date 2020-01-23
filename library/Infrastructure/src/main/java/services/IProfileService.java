package services;

import common.ServiceObjectResponse;
import entity.ProfileEntity;

import java.util.List;

public interface IProfileService {
    ServiceObjectResponse<List<ProfileEntity>> getAll();
    ServiceObjectResponse<ProfileEntity> getByName(String name);
    ServiceObjectResponse<ProfileEntity> update(ProfileEntity profile);
    ServiceObjectResponse delete(String id);
    ServiceObjectResponse<ProfileEntity> getById(String id);

}
