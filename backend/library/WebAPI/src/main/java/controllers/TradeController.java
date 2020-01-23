package controllers;

import common.ServiceObjectResponse;
import entity.TradeEntity;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import services.ITradeService;

import java.util.List;

@RestController
@Api(tags = {"trade"}, value = "TradeService")
public class TradeController {

    @Autowired
    ITradeService _tradeService;
    @ApiOperation(value = "create", nickname = "create")
    @PostMapping("/api/trade")
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
    public TradeEntity CreateTrade(@RequestBody TradeEntity trade) throws Exception
    {
        ServiceObjectResponse<TradeEntity> request = _tradeService.create(trade);

        if(!request.getIsSuccess())
        {
            throw new Exception(request.getMessage());
        }
        return request.getObject();
    }

    @ApiOperation(value = "update", nickname = "update")
    @PutMapping("/api/trade")
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
    public TradeEntity UpdateTrade(@RequestBody TradeEntity trade) throws Exception
    {
        ServiceObjectResponse<TradeEntity> request = _tradeService.update(trade);

        if(!request.getIsSuccess())
        {
            throw new Exception(request.getMessage());
        }
        return request.getObject();
    }

    @ApiOperation(value = "delete", nickname = "delete")
    @DeleteMapping("/api/trade/{id}")
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
    public boolean DeleteTrade(@PathVariable int id) throws Exception
    {
        ServiceObjectResponse request = _tradeService.delete(id);

        if(!request.getIsSuccess())
        {
            throw new Exception(request.getMessage());
        }
        return request.getIsSuccess();
    }

    @ApiOperation(value = "all", nickname = "all")
    @GetMapping("/api/trade/all")
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
    public List<TradeEntity> GetAll() throws Exception
    {
        ServiceObjectResponse<List<TradeEntity>> request = _tradeService.getAll();

        if(!request.getIsSuccess())
        {
            throw new Exception(request.getMessage());
        }
        return request.getObject();
    }
    @ApiOperation(value = "getById", nickname = "getById")
    @GetMapping("/api/trade/{id}")
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
    public TradeEntity GetTradeById(@PathVariable int id) throws Exception
    {
        ServiceObjectResponse<TradeEntity> request = _tradeService.getById(id);

        if(!request.getIsSuccess())
        {
            throw new Exception(request.getMessage());
        }
        return request.getObject();
    }



}
