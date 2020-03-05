const baseUrl = "localhost:7777";

export enum Routes
{
    //public
    Home = "",

    //protected
    Stickers = "stickers",
    Cart = "cart",

    //admin
    AddSticker="admin/product/add"
}

export module Urls
{
    //public
    export const home = `/${Routes.Home}`;

    //protected
    export const stickers = `/${Routes.Stickers}`;
    export const cart = `/${Routes.Cart}`;

    //admin
    export const addSticker= `/${Routes.AddSticker}`;
}