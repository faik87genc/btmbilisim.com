// Small markup pieces shared by the public routes.

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data)
          .replace(/</g, "\u003c")
          .replace(/>/g, "\u003e")
          .replace(/&/g, "\u0026"),
      }}
    />
  );
}
