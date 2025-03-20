import { defineField, defineType } from "sanity";

export default defineType({
  name: "audio",
  title: "Audio",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "audio",
      title: "Audio",
      type: "file",
      options: { accept: "audio/*" },
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),
  ],
});
