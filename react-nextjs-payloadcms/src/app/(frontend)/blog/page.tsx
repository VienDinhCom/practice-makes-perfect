import { payload } from "@/lib/payload";
import { PostListItem } from "./post-list-item";
import { Media } from "@/payload-types";

export default async function Page() {
  const { docs } = await payload.find({ collection: "posts" });

  return (
    <section className="container mx-auto py-6">
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {docs.map((post) => (
          <PostListItem
            key={post.id}
            id={post.id}
            title={post.title}
            image={post.image as Media}
            description={post.content}
          />
        ))}
      </ul>
    </section>
  );
}
