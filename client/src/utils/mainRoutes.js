import {
  RecentlyAddedPage,
  HomePage,
  ProductDetailsPage,
  MensSubCategoryPage,
  WomensSubCategoryPage,
} from "../features/products/pages";
import { MyProfilePage } from "../features/profile/pages";
import {
  ProfileDashboardComponent,
  OrdersTableComponent,
} from "../features/profile/components";
import {
  NewDesignersPage,
  AllDesignersPage,
  DesignerDetailsPage,
} from "../features/designers/pages";

const mainRoutes = [
  { path: "/", element: <HomePage /> },
  {
    path: "/products",
    element: <HomePage />,
    children: [
      { path: "/:id", element: <ProductDetailsPage /> },
      { path: "/new", element: <RecentlyAddedPage /> },
      { path: "/men/:category/:subCategory", element: <MensSubCategoryPage /> },
      {
        path: "/women/:category/:subCategory",
        element: <WomensSubCategoryPage />,
      },
    ],
  },
  {
    path: "/designers",
    element: <AllDesignersPage />,
    children: [
      { path: "/:id", element: <DesignerDetailsPage /> },
      { path: "/new", element: <NewDesignersPage /> },
    ],
  },
  { path: "/whats-new", element: <RecentlyAddedPage /> },
  {
    path: "/me",
    element: <MyProfilePage />,
    children: [
      { path: "/dashboard", element: <ProfileDashboardComponent /> },
      { path: "/orders", element: <OrdersTableComponent /> },
    ],
  },
];

export default mainRoutes;
