import { CollectionConfig } from "payload";

import { Users } from "./users";
import { Media } from "./media";
import { Posts } from "./posts";

export { Users, Media, Posts };

export const collections: CollectionConfig[] = [Posts, Media, Users];
