import * as jwt_decode from "jwt-decode";

import { StorageService } from "./../../services/client/storage.service";
import { StorageKeys } from "./../../settings/constans";

const getToken = (): string | undefined =>
{
    const storageService: StorageService = new StorageService();

    return storageService.read<string>(StorageKeys.JWT);
}

const getDecodedAccessToken = (token: string) =>
{
    try
    {
        return jwt_decode(token);
    }
    catch (error)
    {
        return null;
    }
}

export const isAdmin = () : boolean =>
{
    const token: string | undefined = getToken();

    if (token === undefined || token === null)
    {
        return false;
    }

    const userInfoJSON = JSON.parse(JSON.stringify(getDecodedAccessToken(token)));
    const roles: any[] = userInfoJSON.auth;

    if (roles.toEnum().Any(x => x.authority === "ROLE_ADMIN"))
    {
        return true;
    }
    const storageService: StorageService = new StorageService();
    storageService.remove(StorageKeys.JWT)
    return false;
}