import { toast } from "react-toastify";

const defaultOption = {
    hideProgressBar: true,
    autoClose: 5000,
    type: "info",
    position: "top-right",
}

export const info = (message) => toast(message, defaultOption);
export const success = (message) => toast(message, { ...defaultOption, type: "success" });
export const warning = (message) => toast(message, { ...defaultOption, type: "warning" });
export const error = (message) => toast(message, { ...defaultOption, type: "error" });
