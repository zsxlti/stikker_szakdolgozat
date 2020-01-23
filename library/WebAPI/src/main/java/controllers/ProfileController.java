package controllers;

import common.ServiceObjectResponse;
import entity.ProfileEntity;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import request.RequestProfileByName;
import services.IProfileService;

import javax.validation.Valid;
import java.util.List;

@RestController
@Api(tags = {"profile"}, value = "ProfileService")
public class ProfileController {
    @Autowired
    IProfileService _profileService;

    @ApiOperation(value = "all", nickname = "all")
    @GetMapping("/api/profile/all")
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
    public List<ProfileEntity> GetAll() throws Exception
    {
        ServiceObjectResponse<List<ProfileEntity>> request = _profileService.getAll();

        if(!request.getIsSuccess())
        {
            throw new Exception(request.getMessage());
        }
        return request.getObject();
    }

    @ApiOperation(value = "getByName", nickname = "getByName")
    @PostMapping("/api/profile/byName")
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
    public ProfileEntity GetProfileByName(@RequestBody @Valid RequestProfileByName data) throws Exception
    {
        ServiceObjectResponse<ProfileEntity> request = _profileService.getByName(data.Name);

        if(!request.getIsSuccess())
        {
            throw new Exception(request.getMessage());
        }
        return request.getObject();
    }

    @ApiOperation(value = "update", nickname = "update")
    @PutMapping("/api/profile")
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
    public ProfileEntity UpdateProfile(@RequestBody ProfileEntity profile) throws Exception
    {
        ServiceObjectResponse<ProfileEntity> request = _profileService.update(profile);

        if(!request.getIsSuccess())
        {
            throw new Exception(request.getMessage());
        }
        return request.getObject();
    }

    @ApiOperation(value = "delete", nickname = "delete")
    @DeleteMapping("/api/profile/{id}")
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
    public boolean DeleteProfile(@PathVariable String id) throws Exception
    {
        ServiceObjectResponse request = _profileService.delete(id);

        if(!request.getIsSuccess())
        {
            throw new Exception(request.getMessage());
        }
        return request.getIsSuccess();
    }

    @ApiOperation(value = "getById", nickname = "getById")
    @GetMapping("/api/profile/{id}")
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
    public ProfileEntity GetProfileById(@PathVariable String id) throws Exception
    {
        ServiceObjectResponse<ProfileEntity> request = _profileService.getById(id);

        if(!request.getIsSuccess())
        {
            throw new Exception(request.getMessage());
        }
        return request.getObject();
    }
}
