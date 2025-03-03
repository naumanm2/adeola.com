import { defineField, defineType } from "sanity";

export default defineType({
  name: "video",
  title: "Music Videos",
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
      name: "date",
      title: "Publish Date",
      type: "datetime",
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
        },
      ],
    }),
    defineField({
      name: "videourl",
      title: "URL for video",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
});
