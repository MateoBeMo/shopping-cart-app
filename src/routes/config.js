/**Pages */
import { HomePage, CartPage } from 'pages';

const routes = [
    {
        path: '/home',
        RouteComponent: HomePage,
        exact: true,
    },
    {
        path: '/cart',
        RouteComponent: CartPage,
        exact: true,
    },
    {
        path: '/product/:id',
        RouteComponent: CartPage,
        exact: true,
    },
];

export { routes };
