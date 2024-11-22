import React, { useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { FormSchema, Field, InputType } from "../Interfaces/dynamicForm.interface";

interface JSONEditorProps {
  value: string;
  onChange: (newValue: string) => void;
}

const JSONEditor: React.FC<JSONEditorProps> = ({ value, onChange }) => {
  const [internalValue, setInternalValue] = useState(value);
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isValidFormSchema = (obj: FormSchema): obj is FormSchema => {
    if (typeof obj.formTitle !== "string") return false;
    if (obj.formDescription && typeof obj.formDescription !== "string") return false;
    if (!Array.isArray(obj.fields)) return false;

    return obj.fields.every(isValidField);
  };

  const validateFields = (fields: Field[]) => {
    fields.forEach((field) => {
      if (field.validation?.pattern) {
        try {
          new RegExp(field.validation.pattern);
        } catch {
          throw new Error(`Invalid regex pattern for field "${field.id}"`);
        }
      }
    });
  };

  const isValidField = (field: Field): field is Field => {
    if (typeof field.id !== "string" || field.id.trim() === "") {
      throw new Error(`Field "id" is required and cannot be empty.`);
    }
    if (typeof field.type !== "string" || field.type.trim() === "") {
      throw new Error(`Field "type" is required and cannot be empty.`);
    }
    if (typeof field.label !== "string" || field.label.trim() === "") {
      throw new Error(`Field "label" is required and cannot be empty.`);
    }
  
    if (!Object.values(InputType).includes(field.type as InputType)) {
      throw new Error(`Invalid type for field "${field.id}".`);
    }
  
    if (field.required && typeof field.required !== "boolean") return false;
    if (field.placeholder && typeof field.placeholder !== "string") return false;
  
    if (field.validation) {
      const { pattern, message, min, max } = field.validation;
      if (pattern && typeof pattern !== "string") return false;
      if (message && typeof message !== "string") return false;
      if (min && typeof min !== "number") return false;
      if (max && typeof max !== "number") return false;
  
      if (field.type === InputType.Email && field.validation?.pattern) {
        try {
          new RegExp(field.validation.pattern);
        } catch {
          throw new Error(`Invalid regex pattern for field "${field.id}"`);
        }
      }
    }
  
    return true;
  };

  const validateJson = (jsonString: string) => {
    try {
      setError(null);
      const parsed = JSON.parse(jsonString);
  
      if (Object.keys(parsed).length === 0) {
        throw new Error("JSON is empty. Please provide valid data.");
      }
  
      if (!isValidFormSchema(parsed)) {
        throw new Error("JSON does not match the required schema.");
      }
  
      const ids: Set<string> = new Set();
      parsed.fields.forEach((field: Field) => {
        if (ids.has(field.id)) {
          throw new Error(`Duplicate field id found: "${field.id}". Each field id must be unique.`);
        }
        ids.add(field.id);
      });
  
      validateFields(parsed.fields);
  
      setInternalValue(jsonString); 
      onChange(jsonString); 
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEditorChange = (newValue: string | undefined) => {
    if (newValue) validateJson(newValue);
  };

  const formatJson = () => {
    if (editor) {
      const formatAction = editor.getAction("editor.action.formatDocument");
      formatAction?.run();
    }
  };

  useEffect(() => {
    if (editor) {
      const currentValue = editor.getValue();

      if (currentValue !== internalValue) {
        editor.setValue(internalValue);
      }

      formatJson();
    }
  }, [editor]);

  return (
    <>
      <div className="flex flex-col h-full w-full">
        {error && <div className="text-red-700 bg-red-300 p-3 mb-2 rounded-md border-none">{error}</div>}
        <div className="flex-grow">
          <Editor
            height="100%"
            defaultLanguage="json"
            value={internalValue}
            onChange={handleEditorChange}
            theme="vs-dark"
            options={{
              formatOnType: true,
              formatOnPaste: true,
              tabSize: 2,
              insertSpaces: true,
            }}
            onMount={(editorInstance) => {
              setEditor(editorInstance);
              formatJson();
            }}
          />
        </div>
      </div>
    </>
  );
};

export default JSONEditor;
