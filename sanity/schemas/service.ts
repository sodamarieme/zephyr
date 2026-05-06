import { defineType, defineField } from "sanity";

export const service = defineType({
  name: "service",
  title: "Services",
  type: "document",
  icon: () => "⟨/⟩",
  fields: [
    defineField({
      name: "title",
      title: "Titre du service",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "icon",
      title: "Icône (caractère)",
      type: "string",
      description: "Ex: ✦, ⟨/⟩, ◻, ◈, ↗, ▶",
      validation: (r) => r.required().max(5),
    }),
    defineField({
      name: "description",
      title: "Description courte (card)",
      type: "text",
      rows: 2,
      validation: (r) => r.required().max(150),
    }),
    defineField({
      name: "longDescription",
      title: "Description longue (page service)",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "tags",
      title: "Technologies / Outils",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.min(1).max(6),
    }),
    defineField({
      name: "color",
      title: "Couleur gradient (Tailwind)",
      type: "string",
      description: "Ex: from-blue-500 to-cyan-500",
      placeholder: "from-blue-500 to-cyan-500",
    }),
    defineField({
      name: "order",
      title: "Ordre d'affichage",
      type: "number",
      initialValue: 99,
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
    },
  },
  orderings: [
    { title: "Ordre d'affichage", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
