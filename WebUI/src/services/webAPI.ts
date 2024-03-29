import { SecurityAPI, UserAPI, StickerAPI, PurchaseAPI } from "./settings/wrappers";
import { baseURL } from "./settings/base.url";
import { FetchProxy } from "./settings/fetch.proxy";
import { StorageKeys } from "../settings/constants";
import { StorageService } from "./client/storage.service";

export module WebAPI
{
    const storageService: StorageService = new StorageService();

    const proxy = new FetchProxy();
    proxy.bearerToken = getToken()!;

    let signOutCallback: (() => void) | null = null;

    export const Security: SecurityAPI = new SecurityAPI(baseURL, proxy);
    export const User: UserAPI = new UserAPI(baseURL, proxy);
    export const Sticker: StickerAPI = new StickerAPI(baseURL, proxy);
    export const Purchase: PurchaseAPI = new PurchaseAPI(baseURL, proxy);


    export function attachToConnectionCallback(callback: (res: Response) => void)
    {
        proxy.attachToConnectionCallback(callback);
    }

    export function clearConnectionCallback()
    {
        proxy.clearConnectionCallback();
    }

    export function IsTokenAssigned() : boolean
    {
        const token = getToken();
        return  token != null &&  token !== undefined;
    }

    export function getToken() : string | undefined
    {
        const token: string | undefined = storageService.read<string>(StorageKeys.JWT);
        return token;
    }

    export function setToken(value: string)
    {
        storageService.write(StorageKeys.JWT, value);
        proxy.bearerToken = value;
    }
}