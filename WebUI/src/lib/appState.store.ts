import { StickerEntity } from "./../services/client/stickerService";
import { Cart } from "./../models/cart";

export interface IAppState {
    //readonly variableName: objectType;
    readonly cart: Cart;
    readonly selectedSticker: StickerEntity;

}

export const setIntitialAppState = (): IAppState => {
    const appState: IAppState =
    {
        cart: new Cart(),
        selectedSticker:
        {
            Description: "",
            URL: "",
            Price: 0
        }
    };

    return appState;
}

export const intitialAppState: IAppState = setIntitialAppState();
