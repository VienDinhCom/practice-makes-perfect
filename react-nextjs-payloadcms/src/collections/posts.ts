import type { CollectionConfig } from "payload";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
  },
  auth: true,
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
  ],
};
