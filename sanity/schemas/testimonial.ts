import { defineType, defineField } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Témoignages Clients",
  type: "document",
  icon: () => "★",
  fields: [
    defineField({
      name: "name",
      title: "Nom complet",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "role",
      title: "Poste / Fonction",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "company",
      title: "Entreprise",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "avatar",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "text",
      title: "Témoignage",
      type: "text",
      rows: 4,
      validation: (r) => r.required().min(50).max(400),
    }),
    defineField({
      name: "rating",
      title: "Note (sur 5)",
      type: "number",
      initialValue: 5,
      options: {
        list: [
          { title: "⭐⭐⭐ 3/5", value: 3 },
          { title: "⭐⭐⭐⭐ 4/5", value: 4 },
          { title: "⭐⭐⭐⭐⭐ 5/5", value: 5 },
        ],
      },
      validation: (r) => r.required().min(1).max(5),
    }),
    defineField({
      name: "projectRef",
      title: "Projet associé",
      type: "reference",
      to: [{ type: "project" }],
    }),
    defineField({
      name: "featured",
      title: "Afficher en page d'accueil",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "company",
      media: "avatar",
    },
  },
});
