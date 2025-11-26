import { integer, pgTable, serial, unique } from "drizzle-orm/pg-core";
import restaurant from "./restaurant";
import user from "./user";

const restaurantOwner = pgTable(
  "restaurant_owner",
  {
    id: serial("id").primaryKey(),
    restaurantId: integer("restaurant_id")
      .notNull()
      .references(() => restaurant.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    ownerId: integer("owner_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  },
  (table) => {
    return {
      unqiueOwner: unique().on(table.restaurantId, table.ownerId),
    };
  }
);

export default restaurantOwner;
