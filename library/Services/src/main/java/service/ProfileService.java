package service;

import common.ServiceObjectResponse;
import entity.ProfileEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repositories.IProfileRepository;
import services.IProfileService;

import java.util.List;

@Service
public class ProfileService implements IProfileService {

    @Autowired
    IProfileRepository _profileRepository;

    /*@Override
    public ServiceObjectResponse<ProfileEntity> create(ProfileEntity profile)
    {
        ServiceObjectResponse<ProfileEntity> response = new ServiceObjectResponse<>();

        try
        {
            ProfileEntity data = _profileRepository.create(profile);

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
    }*/

    @Override
    public ServiceObjectResponse<List<ProfileEntity>> getAll()
    {
        ServiceObjectResponse<List<ProfileEntity>> response = new ServiceObjectResponse<>();

        try
        {
            List<ProfileEntity> profiles = _profileRepository.getAll();

            response.setObject(profiles);
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
    public ServiceObjectResponse<ProfileEntity> getByName(String name)
    {
        ServiceObjectResponse<ProfileEntity> response = new ServiceObjectResponse<>();

        try
        {
            ProfileEntity profiles = _profileRepository.getByName(name);

            response.setObject(profiles);
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
    public ServiceObjectResponse<ProfileEntity> update(ProfileEntity profile)
    {
        ServiceObjectResponse<ProfileEntity> response = new ServiceObjectResponse<>();

        try
        {
            ProfileEntity data = _profileRepository.update(profile);

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
    public ServiceObjectResponse delete(String id)
    {
        ServiceObjectResponse response = new ServiceObjectResponse();

        try
        {
            boolean success = _profileRepository.delete(id);

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

    @Override
    public ServiceObjectResponse<ProfileEntity> getById(String id)
    {
        ServiceObjectResponse<ProfileEntity> response = new ServiceObjectResponse<>();

        try
        {
            ProfileEntity profile = _profileRepository.getById(id);

            response.setObject(profile);
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

}
