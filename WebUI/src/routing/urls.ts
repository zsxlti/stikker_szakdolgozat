export enum Routes
{
    //public
    Home = "",

    //protected
    Stickers = "stickers",

    //admin
    AddSticker="admin/sticker/add"
}

export module Urls
{
    //public
    export const home = `/${Routes.Home}`;

    //protected
    export const stickers = `/${Routes.Stickers}`;

    //admin
    export const addSticker= `/${Routes.AddSticker}`;
}