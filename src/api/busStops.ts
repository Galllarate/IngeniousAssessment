import axios, {AxiosResponse} from 'axios'
import {ScheduleItem} from "@/types/api";

export default {
    getBusStops(): Promise<AxiosResponse<ScheduleItem[]>> {
        return axios.get('stops')
    }
}
