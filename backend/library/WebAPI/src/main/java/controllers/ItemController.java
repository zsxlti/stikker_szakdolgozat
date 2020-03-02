package controllers;

import common.ServiceObjectResponse;
import entity.ItemEntity;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import services.IItemService;

import java.util.List;

@RestController
@Api(tags = {"item"}, value = "ItemService")
public class ItemController {
    @Autowired
    IItemService _itemService;

    @ApiOperation(value = "all", nickname = "all")
    @GetMapping("/api/item/all")
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
    public List<ItemEntity> GetAll() throws Exception
    {
        ServiceObjectResponse<List<ItemEntity>> request = _itemService.getAll();

        if(!request.getIsSuccess())
        {
            throw new Exception(request.getMessage());
        }
        return request.getObject();
    }

    @ApiOperation(value = "update", nickname = "update")
    @PutMapping("/api/item")
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
    public ItemEntity UpdateItem(@RequestBody ItemEntity profile) throws Exception
    {
        ServiceObjectResponse<ItemEntity> request = _itemService.update(profile);

        if(!request.getIsSuccess())
        {
            throw new Exception(request.getMessage());
        }
        return request.getObject();
    }

    @ApiOperation(value = "delete", nickname = "delete")
    @DeleteMapping("/api/item/{id}")
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
    public boolean DeleteItem(@PathVariable int id) throws Exception
    {
        ServiceObjectResponse request = _itemService.delete(id);

        if(!request.getIsSuccess())
        {
            throw new Exception(request.getMessage());
        }
        return request.getIsSuccess();
    }

    @ApiOperation(value = "getById", nickname = "getById")
    @GetMapping("/api/item/{id}")
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
    public ItemEntity GetItemById(@PathVariable int id) throws Exception
    {
        ServiceObjectResponse<ItemEntity> request = _itemService.getById(id);

        if(!request.getIsSuccess())
        {
            throw new Exception(request.getMessage());
        }
        return request.getObject();
    }

}
