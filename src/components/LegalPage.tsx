import type { ReactNode } from "react";
import { SiteLayout } from "@/components/SiteLayout";

type Props = {
  eyebrow?: string;
  title: string;
  updatedAt: string;
  children: ReactNode;
};

export function LegalPage({ eyebrow, title, updatedAt, children }: Props) {
  return (
    <SiteLayout>
      <section className="container mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 font-display text-4xl font-bold text-foreground sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Ultimo aggiornamento: {updatedAt}
        </p>

        <div className="prose prose-neutral mt-10 max-w-none text-foreground/90 [&_a]:text-primary [&_a:hover]:underline [&_h2]:font-display [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h3]:font-display [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground [&_p]:mt-4 [&_p]:leading-relaxed [&_p]:text-muted-foreground [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6 [&_ul]:text-muted-foreground [&_li]:leading-relaxed">
          {children}
        </div>
      </section>
    </SiteLayout>
  );
}
