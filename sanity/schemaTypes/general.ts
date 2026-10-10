import { defineField, defineType } from 'sanity'
import { InfoOutlineIcon } from '@sanity/icons'

export default defineType({
  name: 'general',
  title: 'General Information',
  type: 'document',
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description:
        'Subtitle used next to Glitcher front page main image. Optional.',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      description: 'Image used in front page hero element',
      type: 'image',
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      description: 'Image used in the Bio/Quote section on the front page',
      type: 'image',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Photo Gallery',
      description:
        'Photos shown in the swipeable gallery after the Videos section on the front page. Drag to reorder.',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Describe the photo for screen readers.',
            },
          ],
        },
      ],
      options: { layout: 'grid' },
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'Phone number for contact',
      validation: (Rule) =>
        Rule.length(13).warning(
          `Phone number with a country code prefix should be exactly 13 characters.`
        ),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      description: 'Email address for contact',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'socials',
      title: 'Socials',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'inline',
          fields: [
            {
              title: 'Social Media',
              type: 'string',
              name: 'social',
              validation: (Rule) => Rule.required(),
            },
            {
              title: 'Web address',
              type: 'url',
              name: 'url',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'mainLogo',
      title: 'Main Logo',
      description:
        'Giltcher logo used in front page hero. Use .svg image format.',
      type: 'image',
      validation: (Rule) => Rule.required(),
      options: {
        accept: 'image/*',
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'introShort',
      title: 'Short Intro',
      description: 'Short intro text. Present in front page.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'aboutText',
      title: 'About Card Text',
      description:
        'Teaser shown in the About card on the front page. Fades out and links to the full bio.',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'introLong',
      title: 'Long Intro',
      description:
        'Longer intro text. Present in artist profile. Can contain images and links. ',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
      validation: (Rule) => Rule.required(),
    }),
  ],
})
