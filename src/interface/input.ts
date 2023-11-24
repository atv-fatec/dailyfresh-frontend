import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { InputHTMLAttributes } from "react"
export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    type: string
    placeholder: string
    icon: IconProp
    cid: string
    error?: string
    onChange?: (event: any) => void
    name?: string
}