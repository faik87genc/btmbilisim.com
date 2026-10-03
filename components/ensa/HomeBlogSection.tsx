import { Container } from "@/components/ensa/Container";
import { SectionHeading } from "@/components/ensa/SectionHeading";
import { BlogCardSlider } from "@/components/ensa/BlogCardSlider";
import { toCardPost } from "@/components/ensa/BlogCard";
import { Button } from "@/components/ensa/Button";
import { MotionReveal } from "@/components/ensa/MotionReveal";
import { getPublishedPages, postLikePages } from "@/lib/pages";

const HOMEPAGE_POST_COUNT = 9;

/**
 * Latest-posts teaser for the homepage. Self-contained async server component
 * (rather than making the whole homepage async) so it owns its own DB read;
 * renders nothing when there are no live posts yet.
 */
export async function HomeBlogSection() {
  const posts = postLikePages(await getPublishedPages()).slice(0, HOMEPAGE_POST_COUNT);
  if (posts.length === 0) return null;

  return (
    <section className="cv-auto bg-paper-50 py-20 md:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Blog"
            title="Sahadan güncel yazılar."
            description="Siber güvenlik, ağ altyapısı, yedekleme ve kamera sistemleri üzerine uygulamalı rehberler."
          />
          <MotionReveal delay={0.1}>
            <Button href="/blog/" variant="ghost-light">
              Tüm yazıları gör
            </Button>
          </MotionReveal>
        </div>

        <div className="mt-12">
          <BlogCardSlider posts={posts.map(toCardPost)} />
        </div>
      </Container>
    </section>
  );
}
