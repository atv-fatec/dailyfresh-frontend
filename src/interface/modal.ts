import { UserData } from "./dadosUsuario";

export interface IModal{
    OnHide: () => void;
    Show: boolean;
    formData: UserData;
}