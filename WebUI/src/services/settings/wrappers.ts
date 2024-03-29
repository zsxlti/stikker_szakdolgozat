import { SecurityService } from "./../client/securityService";
import { UserService } from "../client/userService";
import { StickerService } from "../client/stickerService";
import { PurchaseService } from "../client/purchaseService";

export class SecurityAPI extends SecurityService
{
    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> })
    {
        super(baseUrl, http);
        this.jsonParseReviver = ReviveDateTime;
    }
}

export class UserAPI extends UserService
{
    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> })
    {
        super(baseUrl, http);
        this.jsonParseReviver = ReviveDateTime;
    }
}

export class StickerAPI extends StickerService
{
    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> })
    {
        super(baseUrl, http);
        this.jsonParseReviver = ReviveDateTime;
    }
}

export class PurchaseAPI extends PurchaseService
{
    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> })
    {
        super(baseUrl, http);
        this.jsonParseReviver = ReviveDateTime;
    }
}


function ReviveDateTime(key: any, value: any): any
{
    const DATE_PREFIX = "JsonDateHandling";
    if (typeof value === "string" && value.startsWith(DATE_PREFIX))
    {
        const datePart = value.substr(DATE_PREFIX.length);
        const converted = new Date(datePart)
        return converted;
    }

    return value;
}