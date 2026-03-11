import { type SchemaTypeDefinition } from 'sanity'
import show from './show'
import video from './video'
import general from './general'
import audio from './audio'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [audio, show, video, general],
}
