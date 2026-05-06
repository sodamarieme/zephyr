import { defineType, defineField } from "sanity";

export const post = defineType({
  name: "post",
  title: "Articles de Blog",
  type: "document",
  icon: () => "✦",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (r) => r.required().min(5).max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title", maxLength: 100 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "author",
      title: "Auteur",
      type: "reference",
      to: [{ type: "teamMember" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Image de couverture",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Catégorie",
      type: "string",
      options: {
        list: [
          { title: "Design", value: "Design" },
          { title: "Développement", value: "Développement" },
          { title: "Business Digital", value: "Business Digital" },
          { title: "Mobile", value: "Mobile" },
          { title: "SEO & Marketing", value: "SEO & Marketing" },
          { title: "Actualités", value: "Actualités" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Extrait (meta description)",
      type: "text",
      rows: 3,
      validation: (r) => r.required().max(200),
    }),
    defineField({
      name: "readingTime",
      title: "Temps de lecture (minutes)",
      type: "number",
      initialValue: 5,
      validation: (r) => r.required().min(1).max(60),
    }),
    defineField({
      name: "publishedAt",
      title: "Date de publication",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      title: "Contenu",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Citation", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Gras", value: "strong" },
              { title: "Italique", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Lien",
                fields: [{ name: "href", type: "url", title: "URL" }],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Texte alternatif" }],
        },
        {
          type: "code",
          options: { language: "typescript", languageAlternatives: [
            { title: "TypeScript", value: "typescript" },
            { title: "JavaScript", value: "javascript" },
            { title: "Bash", value: "bash" },
            { title: "CSS", value: "css" },
          ]},
        },
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        { name: "metaTitle", type: "string", title: "Meta title (max 60 chars)" },
        { name: "metaDescription", type: "text", title: "Meta description (max 160 chars)", rows: 3 },
        { name: "keywords", type: "array", title: "Mots-clés", of: [{ type: "string" }] },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "coverImage",
    },
  },
  orderings: [
    { title: "Date (récent)", name: "publishedDesc", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
});
