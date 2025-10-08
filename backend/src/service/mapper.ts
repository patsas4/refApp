import { Prisma } from "@prisma/client";

/**
 * Generic function to map a model object to a Prisma CreateInput
 * Handles foreign key relations automatically by stripping "Id"
 */
export function mapToInput<T extends Record<string, any>, modelType>(
  model: T,
  userId?: number
): modelType {
  const data: Record<string, any> = {};

  for (const [key, value] of Object.entries(model)) {
    if (value === undefined || value === null) continue;

    if (key.endsWith("Id")) {
      // e.g. "homeTeamId" -> "homeTeam"
      const relationName = key.replace(/Id$/, "");
      data[relationName] = { connect: { [key]: value } };
    } else {
      data[key] = value;
    }
  }

  // Add audit fields if required
  if (userId !== undefined) {
    data.createdByUser = { connect: { userId } };
  }

  // Always set createdAt if the model supports it
  if ("createdAt" in model === false) {
    data.createdAt = new Date();
  }

  return data as modelType;
}
