import { defineType, defineField } from "sanity";

export const project = defineType({
  name: "project",
  title: "Projets Portfolio",
  type: "document",
  icon: () => "◻",
  fields: [
    defineField({
      name: "title",
      title: "Titre du projet",
      type: "string",
      validation: (r) => r.required().min(2).max(80),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "featured",
      title: "Projet mis en avant",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "category",
      title: "Catégorie",
      type: "string",
      options: {
        list: [
          { title: "Web Design", value: "Web Design" },
          { title: "Web Développement", value: "Web Développement" },
          { title: "Application Mobile", value: "Application Mobile" },
          { title: "Identité Visuelle", value: "Identité Visuelle" },
          { title: "Web Marketing", value: "Web Marketing" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags (filtres portfolio)",
      type: "array",
      of: [
        {
          type: "string",
          options: {
            list: [
              { title: "Web Design", value: "web-design" },
              { title: "Web Dev", value: "web-dev" },
              { title: "Mobile", value: "mobile" },
              { title: "Identité", value: "identity" },
              { title: "Marketing", value: "marketing" },
            ],
          },
        },
      ],
      validation: (r) => r.min(1),
    }),
    defineField({
      name: "excerpt",
      title: "Description courte",
      type: "text",
      rows: 3,
      validation: (r) => r.required().max(200),
    }),
    defineField({
      name: "coverImage",
      title: "Image principale",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "gallery",
      title: "Galerie d'images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "client",
      title: "Nom du client",
      type: "string",
    }),
    defineField({
      name: "url",
      title: "URL du projet (live)",
      type: "url",
    }),
    defineField({
      name: "year",
      title: "Année",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      title: "Description complète",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
      ],
    }),
    defineField({
      name: "technologies",
      title: "Technologies utilisées",
      type: "array",
      of: [{ type: "string" }],
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
    { title: "Année (récent)", name: "yearDesc", by: [{ field: "year", direction: "desc" }] },
    { title: "Mis en avant", name: "featuredFirst", by: [{ field: "featured", direction: "desc" }] },
  ],
});
