export interface IBotao{
    label: string
    id: string
    link?: string
    OnClick?: () => void;
    type?: "button" | "submit" | "reset" | undefined
}