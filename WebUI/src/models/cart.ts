import { StickerEntity } from "./../services/client/stickerService";
import { BehaviorSubject } from "rxjs";

export class Cart
{
    private _stickers: StickerEntity[] = [];
    private _count: BehaviorSubject<number> = new BehaviorSubject(0);
    public count$ = this._count.asObservable();

    public add = (sticker: StickerEntity): void =>
    {
        this._stickers.push(sticker);
        this._count.next(this._stickers.length);
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

    public sum = (): number =>
    {
        return this._stickers.toEnum().Sum(x => x.Price!);
    }
}