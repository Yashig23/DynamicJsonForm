import { Field, FormSchema } from "../Interfaces/dynamicForm.interface"; // Import the interfaces

export const validateJsonSchema = (json: FormSchema): string[] => {
  const errors: string[] = [];

  // Check root keys
  if (!json.formTitle) errors.push("Missing 'formTitle' key");
  if (!json.formDescription) errors.push("Missing 'formDescription' key");
  if (!json.fields || !Array.isArray(json.fields)) errors.push("'fields' must be an array");

  // Validate fields
  if (Array.isArray(json.fields)) {
    json.fields.forEach((field: Field, index: number) => {
      if (!field.id) errors.push(`Field at index ${index} is missing 'id'`);
      if (!field.type) errors.push(`Field at index ${index} is missing 'type'`);
      if (!field.label) errors.push(`Field at index ${index} is missing 'label'`);
      if (typeof field.required !== "boolean") errors.push(`Field at index ${index} has invalid 'required'`);
      if (!field.placeholder) errors.push(`Field at index ${index} is missing 'placeholder'`);
      if (field.validation) {
        if (!field.validation.pattern) errors.push(`Validation for field at index ${index} is missing 'pattern'`);
        if (!field.validation.message) errors.push(`Validation for field at index ${index} is missing 'message'`);
      }
    });
  }

  return errors;
};
