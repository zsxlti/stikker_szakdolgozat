import { DeepPartial } from "./deep.partial";

function isObjectButNotArray(target: any)
{
    return (target && typeof target === "object" && !(target instanceof Date) && !Array.isArray(target));
}

export function deepAssign<T extends {}>(target: T, source: DeepPartial<T>)
{
    const src = <any>source;
    const tar = <any>target;
    const newObj = <any>{};

    for (const key in target)
    {
        if (isObjectButNotArray(tar[key]))
        {
            newObj[key] = src.hasOwnProperty(key) ? deepAssign(tar[key], src[key]) : tar[key]

        }
        else
        {
            newObj[key] = src.hasOwnProperty(key) ? src[key] : tar[key]
        }
    }

    return <T>newObj;
}