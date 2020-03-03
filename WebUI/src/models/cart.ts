import { StickerEntity } from "./../services/client/stickerService";

export class Cart
{
    private _stickers: StickerEntity[] = [];

    public add = (sticker: StickerEntity): void =>
    {
        this._stickers.push(sticker);
    }

    public remove = (sticker: StickerEntity): void =>
    {
        this._stickers.remove(sticker);
    }

    public clear = (): void =>
    {
        this._stickers = [];
    }

    public count = (): number =>
    {
        return this._stickers.length;
    }

    public content = (): StickerEntity[] =>
    {
        return this._stickers;
    }
}