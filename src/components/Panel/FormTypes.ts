export type InputType = "text" | "number" | "email" | "checkbox";
export type ElementType = "input" | "select" | "textarea" | "custom";

export interface InputSpecification {
  elementType: ElementType;
  label: string;
  name: string;
  type?: InputType;
  required?: boolean;
  defaultValue?: string | number | boolean;
  options?: string[];
  // Additional properties for specific elements
  // For example, `select` element
  multiple?: boolean;
  // For example, `textarea` element
  rows?: number;
  // For example, `custom` element
  customProps?: Record<string, any>;
}
export type visualizer_requirements = {
    backend_query: boolean,
    data: any[],
    categories: string[],
    chartOptions: any,
    style_fields: any,
    fields: InputSpecification[]
}
export interface FormSchema {
  elements: InputSpecification[];
}
