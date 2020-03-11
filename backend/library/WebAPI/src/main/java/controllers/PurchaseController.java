package controllers;

import common.ServiceObjectResponse;
import entity.ItemEntity;
import entity.PurchaseEntity;
import entity.StickerEntity;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import request.PurchaseRequest;
import services.IPurchaseService;

import java.util.List;

@RestController
@Api(tags = {"purchase"}, value = "PurchaseService")
public class PurchaseController {

    @Autowired
    IPurchaseService _purchaseService;



    @ApiOperation(value = "create", nickname = "create")
    @PostMapping("/api/purchase")
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
    public PurchaseEntity CreatePurchase(@RequestBody PurchaseRequest purchase) throws Exception
    {
        ServiceObjectResponse<PurchaseEntity> request = _purchaseService.create(purchase);

        if(!request.getIsSuccess())
        {
            throw new Exception(request.getMessage());
        }
        return request.getObject();
    }

    @ApiOperation(value = "all", nickname = "all")
    @GetMapping("/api/purchase/all")
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
    public List<PurchaseEntity> GetAll() throws Exception
    {
        ServiceObjectResponse<List<PurchaseEntity>> request = _purchaseService.getAll();

        if(!request.getIsSuccess())
        {
            throw new Exception(request.getMessage());
        }
        return request.getObject();
    }
    @ApiOperation(value = "getById", nickname = "getById")
    @GetMapping("/api/purchase/{id}")
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
    public PurchaseEntity GetPurchaseById(@PathVariable int id) throws Exception
    {
        ServiceObjectResponse<PurchaseEntity> request = _purchaseService.getById(id);

        if(!request.getIsSuccess())
        {
            throw new Exception(request.getMessage());
        }
        return request.getObject();
    }

    /*@ApiOperation(value = "all", nickname = "all")
    @GetMapping("/api/item/all")
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
    public List<ItemEntity> GetAllItems() throws Exception
    {
        ServiceObjectResponse<List<ItemEntity>> request = _purchaseService.getAllItems();

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
    public ItemEntity UpdateItem(@RequestBody ItemEntity item) throws Exception
    {
        ServiceObjectResponse<ItemEntity> request = _purchaseService.updateItem(item);

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
        ServiceObjectResponse request = _purchaseService.deleteItem(id);

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
        ServiceObjectResponse<ItemEntity> request = _purchaseService.getItemById(id);

        if(!request.getIsSuccess())
        {
            throw new Exception(request.getMessage());
        }
        return request.getObject();
    }
*/

}
