import {RouteRecordRaw} from "vue-router";
import {lazyLoading} from "@/router/utils";
import {RouteNames, RoutePaths} from "@/router/enums";

const routes: Array<RouteRecordRaw> = [
    {
        path: RoutePaths.root,
        component: () => import('../layouts/defaultLayout.vue'),
        children: [
            {
                path: '',
                name: RouteNames.busLines,
                component: lazyLoading('BusLines'),

            },
            {
                path: RoutePaths.stops,
                name: RouteNames.busStops,
                component: lazyLoading('BusStops'),
            },
            {
                path: `/:pathMatch*`,
                redirect: { name: RouteNames.busLines }
            }
        ]
    }
]


export default routes