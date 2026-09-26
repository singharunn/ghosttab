import { ZodSchema, ZodError } from "zod";

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: ValidationError[];
}

/**
 * Validates data against a Zod schema
 */
export function validate<T>(
  schema: ZodSchema,
  data: unknown
): ValidationResult<T> {
  try {
    const result = schema.parse(data);
    return {
      success: true,
      data: result as T,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        errors: error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      };
    }
    return {
      success: false,
      errors: [
        {
          field: "unknown",
          message: "An unknown validation error occurred",
        },
      ],
    };
  }
}

/**
 * Validates URL format and safety
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return url.startsWith("chrome://") || url.startsWith("about:");
  }
}

/**
 * Extracts domain from URL
 */
export function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    if (url.startsWith("chrome://")) {
      return "chrome";
    }
    return "unknown";
  }
}
