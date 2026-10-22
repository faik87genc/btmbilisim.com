import type { Metadata } from "next";
import { BlogIndex, blogIndexMetadata } from "@/components/site/BlogIndex";

export const revalidate = 86400;

export const metadata: Metadata = blogIndexMetadata(1);

export default function BlogPage() {
  return <BlogIndex pageNum={1} />;
}
