import { Card, CardContent, CardFooter, CardHeader } from "@esmate/shadcn/components/ui/card";
import defaultImage from "./placeholder.png";
import { ArrowRight } from "@esmate/shadcn/pkgs/lucide-react";
import Image from "next/image";
import { Media } from "@/payload-types";

interface Props {
  id: number;
  title: string;
  image?: Media;
}

export function PostListItem(props: Props) {
  const url = `/blog/${props.id}/`;

  return (
    <Card key={props.id} className="grid grid-rows-[auto_auto_1fr_auto] overflow-hidden pt-0">
      <div className="aspect-video w-full">
        <a href={url} className="fade-in transition-opacity duration-200 hover:opacity-70">
          <Image
            src={props.image?.url || defaultImage.src}
            alt={props.title}
            height={props.image?.height || defaultImage.height}
            width={props.image?.width || defaultImage.width}
            className="h-full w-full object-cover object-center"
          />
        </a>
      </div>
      <CardHeader>
        <h3 className="text-lg font-semibold hover:underline md:text-xl">
          <a href={url}>{props.title}</a>
        </h3>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{props.description}</p>
      </CardContent>
      <CardFooter>
        <a href={url} className="text-foreground flex items-center hover:underline">
          Read more
          <ArrowRight className="ml-2 size-4" />
        </a>
      </CardFooter>
    </Card>
  );
}
