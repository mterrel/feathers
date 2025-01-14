import { JSONSchema } from 'json-schema-to-ts';

export const queryProperty = <T extends JSONSchema> (definition: T) => ({
  oneOf: [
    definition,
    {
      type: 'object',
      additionalProperties: false,
      properties: {
        $gt: definition,
        $gte: definition,
        $lt: definition,
        $lte: definition,
        $ne: definition,
        $in: {
          type: 'array',
          items: definition
        },
        $nin: {
          type: 'array',
          items: definition
        }
      }
    }
  ]
} as const);

export const queryArray = <T extends readonly string[]> (fields: T) => ({
  type: 'array',
  items: {
    type: 'string',
    enum: fields
  }
} as const);
