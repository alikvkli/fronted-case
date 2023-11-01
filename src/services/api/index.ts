import {SelectDataResponse} from "./types";
import axios from "axios";

export const getSelectData = async (): Promise<SelectDataResponse> => {
    const {data} = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/assets/items.json`)
    return data;
}