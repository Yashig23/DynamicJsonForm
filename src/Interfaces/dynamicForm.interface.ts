export interface Field {
    id: string;
    type: InputType;
    label: string;
    required?: boolean;
    placeholder?: string;
    validation?: {
      pattern?: string;
      message?: string;
      min?: number;
      max?: number;
    };
    options?: { value: string; label: string }[];
    defaultValue?: string | number | boolean;
  }
  
  export interface FormSchema {
    formTitle: string;
    formDescription?: string;
    fields: Field[];
  }

  export enum InputType {
    Button = "button",
    Checkbox = "checkbox",
    Color = "color",
    Date = "date",
    DateTimeLocal = "datetime-local",
    Email = "email",
    File = "file",
    Hidden = "hidden",
    Image = "image",
    Month = "month",
    Number = "number",
    Password = "password",
    Radio = "radio",
    Range = "range",
    Reset = "reset",
    Search = "search",
    Submit = "submit",
    Tel = "tel",
    Text = "text",
    Time = "time",
    Url = "url",
    Week = "week",
    Select = "select",
    Textarea = "textarea"
  }


  // interface for testing 
  export const formSchema: FormSchema = {
    formTitle: 'Contact Form',
    formDescription: 'Please fill in the details below.',
    fields: [
      { id: 'name', label: 'Name', required: true, type: InputType.Text },
      { id: 'email', label: 'Email', required: true, type: InputType.Email },
      { id: 'message', label: 'Message', required: false, type: InputType.Textarea }
    ]
  };
  
  
  

  