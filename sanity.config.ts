import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  title: "Zephyr CMS",
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Zephyr Back-Office")
          .items([
            S.listItem()
              .title("◻  Projets Portfolio")
              .schemaType("project")
              .child(S.documentTypeList("project").title("Projets")),
            S.listItem()
              .title("✦  Articles de Blog")
              .schemaType("post")
              .child(S.documentTypeList("post").title("Articles")),
            S.divider(),
            S.listItem()
              .title("★  Témoignages Clients")
              .schemaType("testimonial")
              .child(S.documentTypeList("testimonial").title("Témoignages")),
            S.listItem()
              .title("◈  Équipe")
              .schemaType("teamMember")
              .child(S.documentTypeList("teamMember").title("Membres")),
            S.listItem()
              .title("⟨/⟩  Services")
              .schemaType("service")
              .child(S.documentTypeList("service").title("Services")),
          ]),
    }),
    visionTool({ defaultApiVersion: "2024-01-01" }),
  ],
});
