import { defineField, defineType } from "sanity";

export default defineType({
  name: "show",
  title: "Shows",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    // we dont need this right? do we have individual pages for shows

    // defineField({
    //   name: "slug",
    //   title: "Slug",
    //   type: "slug",
    //   options: {
    //     source: "title",
    //     maxLength: 96,
    //   },
    //   validation: (Rule) =>
    //     Rule.required().custom((slug) => {
    //       if (typeof slug === "undefined") return true;
    //       const regex = /(^[a-z0-9-]+$)/;
    //       if (slug.current && regex.test(slug.current)) {
    //         return true;
    //       } else {
    //         return "Invalid slug: Only numbers, lowercase letters, and dashes are permitted.";
    //       }
    //     }),
    // }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "datetime",
    }),
    defineField({
      title: "Is it an upcoming show?",
      name: "live",
      type: "boolean",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tickets",
      title: "Tickets",
      type: "array",
      of: [
        {
          type: "object",
          name: "inline",
          fields: [
            {
              title: "Venue",
              type: "string",
              name: "venue",
              validation: (Rule) => Rule.required(),
            },
            {
              title: "Web address",
              type: "url",
              name: "url",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
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
  ],
});
