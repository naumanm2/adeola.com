import { type SchemaTypeDefinition } from "sanity";
import show from "./show";
import video from "./video";
import general from "./general";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [show, video, general],
};
