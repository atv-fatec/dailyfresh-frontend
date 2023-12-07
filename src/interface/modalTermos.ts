export interface IModalTermos{
    Show: boolean;
    OnHide: () => void;
    OnAccept: () => void;
    OnReject: () => void;
    userId: number | undefined;
}