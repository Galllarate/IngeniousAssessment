import axios from 'axios'
import {GATEWAY_API} from "@/configuration";
import busStops from "@/api/busStops";

axios.defaults.baseURL = GATEWAY_API


export default {
    busStops
}
