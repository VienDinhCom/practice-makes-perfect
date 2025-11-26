import { z } from "zod";
import { initTRPC } from "@trpc/server";
import { and, eq, inArray } from "drizzle-orm";
import { category, city, menuItem, order, restaurant, user } from "@/db/schema";
import type { Context } from "./context";
import db from "@/db";

const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  getCategoriesQuery: t.procedure.query(async () => {
    return db.query.category.findMany();
  }),

  getCategoriesSelect: t.procedure.query(async () => {
    return db.select().from(category);
  }),

  getRestaurantsQueryRelated: t.procedure.query(async () => {
    return await db.query.restaurant.findMany({
      with: {
        city: {
          with: {
            state: true,
          },
        },
      },
    });
  }),

  getRestaurantByIdQuery: t.procedure
    .input(z.object({ restaurantId: z.number() }))
    .query(async (opts) => {
      const { restaurantId } = opts.input;
      return await db.query.restaurant.findFirst({
        where: eq(restaurant.id, restaurantId),
        with: {
          menuItems: {
            with: {
              category: true,
            },
          },
        },
      });
    }),

  getRestaurantByIdSelect: t.procedure
    .input(z.object({ restaurantId: z.number() }))
    .query(async (opts) => {
      const { restaurantId } = opts.input;
      return await db
        .select()
        .from(restaurant)
        .where(eq(restaurant.id, restaurantId))
        .leftJoin(menuItem, eq(menuItem.restaurantId, restaurant.id))
        .leftJoin(category, eq(menuItem.categoryId, category.id));
    }),

  getRestaurantMenuByCategoryId: t.procedure
    .input(z.object({ restaurantId: z.number(), categoryId: z.number() }))
    .query(async (opts) => {
      const { restaurantId, categoryId } = opts.input;
      return await db.query.restaurant.findFirst({
        where: eq(restaurant.id, restaurantId),
        with: {
          menuItems: {
            where: eq(menuItem.categoryId, categoryId),
            with: {
              category: true,
            },
          },
        },
      });
    }),

  getRestaurantMenuByCategoryName: t.procedure
    .input(z.object({ restaurantId: z.number(), categoryName: z.string() }))
    .query(async (opts) => {
      const { restaurantId, categoryName } = opts.input;
      return await db.query.restaurant.findFirst({
        where: eq(restaurant.id, restaurantId),
        with: {
          menuItems: {
            where: eq(
              menuItem.categoryId,
              db
                .select({ id: category.id })
                .from(category)
                .where(eq(category.name, categoryName))
            ),
            with: {
              category: true,
            },
          },
        },
      });
    }),

  getRestaurantCustomers: t.procedure
    .input(z.object({ restaurantId: z.number() }))
    .query(async (opts) => {
      const { restaurantId } = opts.input;
      return await db.query.user.findMany({
        where: inArray(
          user.id,
          db
            .select({ userId: order.userId })
            .from(order)
            .where(eq(order.restaurantId, restaurantId))
        ),
        with: {
          orders: {
            where: eq(order.restaurantId, restaurantId),
          },
        },
      });
    }),

  getMenuItemsByCategoryByCity: t.procedure
    .input(z.object({ cityName: z.string(), categoryName: z.string() }))
    .query(async (opts) => {
      const { cityName, categoryName } = opts.input;
      return await db.query.menuItem.findMany({
        where: and(
          eq(
            menuItem.categoryId,
            db
              .select({ id: category.id })
              .from(category)
              .where(eq(category.name, categoryName))
          ),
          inArray(
            menuItem.restaurantId,
            db
              .select({ id: restaurant.id })
              .from(restaurant)
              .where(
                eq(
                  restaurant.cityId,
                  db
                    .select({ id: city.id })
                    .from(city)
                    .where(eq(city.name, cityName))
                )
              )
          )
        ),
        with: {
          restaurant: {
            with: {
              city: true,
            },
          },
          category: true,
        },
      });
    }),
});

export type AppRouter = typeof appRouter;
