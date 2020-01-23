package controllers;

import common.ServiceObjectResponse;
import entity.StickerEntity;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import services.IStickerService;

import java.util.List;

@RestController
@Api(tags = {"sticker"}, value = "StickerService")
public class StickerController {

    @Autowired
    IStickerService _stickerService;


    @ApiOperation(value = "create", nickname = "create")
    @PostMapping("/api/sticker")
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
    public StickerEntity CreateSticker(@RequestBody StickerEntity sticker) throws Exception
    {
        ServiceObjectResponse<StickerEntity> request = _stickerService.create(sticker);

        if(!request.getIsSuccess())
        {
            throw new Exception(request.getMessage());
        }
        return request.getObject();
    }

    @ApiOperation(value = "update", nickname = "update")
    @PutMapping("/api/sticker")
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
    public StickerEntity UpdateSticker(@RequestBody StickerEntity sticker) throws Exception
    {
        ServiceObjectResponse<StickerEntity> request = _stickerService.update(sticker);

        if(!request.getIsSuccess())
        {
            throw new Exception(request.getMessage());
        }
        return request.getObject();
    }

    @ApiOperation(value = "delete", nickname = "delete")
    @DeleteMapping("/api/sticker/{id}")
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
    public boolean DeleteSticker(@PathVariable int id) throws Exception
    {
        ServiceObjectResponse request = _stickerService.delete(id);

        if(!request.getIsSuccess())
        {
            throw new Exception(request.getMessage());
        }
        return request.getIsSuccess();
    }

    @ApiOperation(value = "all", nickname = "all")
    @GetMapping("/api/sticker/all")
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
    public List<StickerEntity> GetAll() throws Exception
    {
        ServiceObjectResponse<List<StickerEntity>> request = _stickerService.getAll();

        if(!request.getIsSuccess())
        {
            throw new Exception(request.getMessage());
        }
        return request.getObject();
    }

    @ApiOperation(value = "getById", nickname = "getById")
    @GetMapping("/api/sticker/{id}")
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
    public StickerEntity GetStickerById(@PathVariable int id) throws Exception
    {
        ServiceObjectResponse<StickerEntity> request = _stickerService.getById(id);

        if(!request.getIsSuccess())
        {
            throw new Exception(request.getMessage());
        }
        return request.getObject();
    }

}
