import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../api/router";

const client = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc",
      async headers() {
        return {};
      },
    }),
  ],
});

try {
  const categories = await client.getCategoriesSelect.query();
  console.log("getCategoriesSelect", categories);

  const restaurants = await client.getRestaurantsQueryRelated.query();
  console.log("getRestaurantsQueryRelated", restaurants);

  const restaurant = await client.getRestaurantByIdQuery.query({
    restaurantId: 1,
  });
  console.log("getRestaurantByIdQuery", restaurant);

  // const restaurant = await client.getRestaurantByIdSelect.query({
  //   restaurantId: 2,
  // });
  // console.log("getRestaurantByIdQuery", restaurant);

  const restaurantWithMenuCategory =
    await client.getRestaurantMenuByCategoryName.query({
      restaurantId: 3,
      categoryName: "Dinner",
    });
  console.log("getRestaurantMenuByCategoryName", restaurantWithMenuCategory);

  const customers = await client.getRestaurantCustomers.query({
    restaurantId: 5,
  });
  console.log("getRestaurantCustomers", customers);

  const menuItems = await client.getMenuItemsByCategoryByCity.query({
    cityName: "New York",
    categoryName: "Desserts",
  });
  console.log("getMenuItemsByCategoryByCity", menuItems);
} catch (error) {
  console.log(error);
}
