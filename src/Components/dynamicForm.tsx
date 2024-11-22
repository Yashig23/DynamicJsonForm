import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Field, FormSchema, InputType } from "../Interfaces/dynamicForm.interface";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface DynamicFormProps {
    schema: FormSchema; 
}

type FormData = Record<string, any>;

const FieldWrapper: React.FC<{
    field: Field;
    children: React.ReactNode;
    error?: string;
}> = ({ field, children, error }) => (
    <div key={field.id} className="mb-6 w-full bg-lightBg text-lightText dark:bg-darkBg dark:text-darkText ">
        {field.label && (
            <label
                htmlFor={field.id}
                className="block text-md font-semibold bg-lightBg text-lightText dark:bg-darkBg dark:text-darkText mb-2"
            >
                {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
        )}
        {children}
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
);

const validInputTypes = Object.values(InputType);

const downloadJSON = (data: FormData) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'form-submission.json';
    link.click();
};


const isValidFieldType = (type: string): boolean => {
    return validInputTypes.includes(type as InputType);
};

const DynamicForm: React.FC<DynamicFormProps> = ({ schema }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const validateSchema = (schema: FormSchema): void => {
        schema.fields.forEach((field) => {
            if (!isValidFieldType(field.type)) {
                console.error(`Invalid field type "${field.type}" for field ID "${field.id}"`);
            }
        });
    };

    validateSchema(schema);

    const [downloadButton, setDownloadButton] = useState<boolean>(false);
    const [formData, setData] = useState<FormData>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit: SubmitHandler<FormData> = (data) => {
        if(!isSubmitting){
        toast("Form submitted successfully 🎉");
        console.log("Form Data:", data);
        setData(data);
        setDownloadButton(true);
        setIsSubmitting(true);
        }
    };

    const copyJSONToClipboard = (data: FormData) => {
        const jsonString = JSON.stringify(data, null, 2);
        navigator.clipboard.writeText(jsonString).then(() => {
            alert("Form data copied to clipboard!");
        }).catch((err) => {
            alert("Failed to copy to clipboard: " + err);
        });
    };

    const renderField = (field: Field) => {
        if (!isValidFieldType(field.type)) return null;

        const commonProps = {
            id: field.id,
            ...register(field.id, {
                required: field.required ? "This field is required" : undefined,
                pattern: field.validation?.pattern
                    ? {
                        value: new RegExp(field.validation.pattern),
                        message: field.validation.message || "Invalid pattern",
                    }
                    : undefined,
            }),
        };

        const baseInputClass =
            "mt-1 block w-full rounded-lg border-gray-300 shadow focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300";

        switch (field.type) {
            case InputType.Text:
            case InputType.Email:
            case InputType.Password:
            case InputType.Number:
            case InputType.Search:
            case InputType.Tel:
            case InputType.Url:
            case InputType.Date:
            case InputType.DateTimeLocal:
            case InputType.Time:
            case InputType.Week:
            case InputType.Month:
            case InputType.Color:
                return (
                    <FieldWrapper field={field} error={errors[field.id]?.message as string}>
                        <input
                            {...commonProps}
                            type={field.type}
                            placeholder={field.placeholder}
                            className={`${baseInputClass} p-4 rounded-md w-full border-none  bg-lightBg text-lightText dark:bg-darkBg dark:text-darkText`}
                        />
                    </FieldWrapper>
                );

            case InputType.Checkbox:
                return (
                    <FieldWrapper field={field} error={errors[field.id]?.message as string}>
                        <div className="flex items-center space-x-3">
                            <input
                                {...commonProps}
                                type="checkbox"
                                className="h-5 w-5 border-gray-300 rounded focus:ring-indigo-500 p-3 bg-lightBg text-lightText dark:bg-darkBg dark:text-darkText"
                            />
                            <label
                                htmlFor={field.id}
                                className="block text-md bg-lightBg text-lightText dark:bg-darkBg dark:text-darkText"
                            >
                                {field.label}
                            </label>
                        </div>
                    </FieldWrapper>
                );

            case InputType.Select:
                return (
                    <FieldWrapper field={field} error={errors[field.id]?.message as string}>
                        <select
                            {...commonProps}
                            className="p-4 rounded-md w-full border-none bg-lightBg text-lightText dark:bg-darkBg dark:text-darkText"
                        >
                            <option value="">Select an option</option>
                            {field.options?.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </FieldWrapper>
                );

            case InputType.Radio:
                return (
                    <FieldWrapper field={field} error={errors[field.id]?.message as string}>
                        <div className="space-y-2">
                            {field.options?.map((option) => (
                                <label
                                    key={option.value}
                                    className="inline-flex items-center space-x-2"
                                >
                                    <input
                                        {...commonProps}
                                        type="radio"
                                        value={option.value}
                                        className="h-4 w-4 border-gray-300 focus:ring-indigo-500 m-1 bg-lightBg text-lightText dark:bg-darkBg dark:text-darkText"
                                    />
                                    <span className="bg-lightBg text-lightText dark:bg-darkBg dark:text-darkText font-medium">{option.label}</span>
                                </label>
                            ))}
                        </div>
                    </FieldWrapper>
                );

            case InputType.Textarea:
                return (
                    <FieldWrapper field={field} error={errors[field.id]?.message as string}>
                        <textarea
                            {...commonProps}
                            placeholder={field.placeholder}
                            className="p-4 rounded-md w-full border-none bg-slate-100 h-32 resize-none text-lightText dark:bg-darkBg dark:text-darkText"
                        />
                    </FieldWrapper>
                );

            case InputType.File:
                return (
                    <FieldWrapper field={field} error={errors[field.id]?.message as string}>
                        <input
                            {...commonProps}
                            type="file"
                            className={`${baseInputClass} file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 bg-lightBg text-lightText dark:bg-darkBg dark:text-darkText`}
                        />
                    </FieldWrapper>
                );

            default:
                return null;
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className=" p-8 rounded-lg shadow-lg space-y-6 w-full h-[80vh] overflow-y-auto max-w-4xl mx-auto bg-lightBg text-lightText dark:bg-darkBg dark:text-darkText"
            style={{
              minHeight: "90vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
        
        >
            {schema.fields.map(renderField)}
            <button
                disabled={isSubmitting} 
                type="submit"
                className="w-full  bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg hover:from-purple-500 hover:to-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-300"
            >
                {isSubmitting ? "Submitted..." : "Submit"} 
            </button>
            {downloadButton && formData && (
                <>
                    <button
                        onClick={() => downloadJSON(formData)} // Pass the correct formData
                        className="w-full bg-gradient-to-r from-blue-500 to-pink-600 text-white py-3 rounded-lg hover:from-pink-500 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-indigo-300"
                    >
                        Download as JSON
                    </button>

                    <button
                        onClick={() => copyJSONToClipboard(formData)} // Pass the correct formData
                        className="w-full bg-gradient-to-r from-green-500 to-yellow-500 text-white py-3 rounded-lg hover:from-yellow-500 hover:to-green-600 focus:outline-none focus:ring-4 focus:ring-indigo-300 mt-4"
                    >
                        Copy Form JSON
                    </button>
                </>
            )}


            <ToastContainer />
        </form>
    );
};

export default DynamicForm;

