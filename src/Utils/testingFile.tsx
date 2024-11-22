import { render, screen, fireEvent } from '@testing-library/react';
import DynamicForm from '../Components/dynamicForm'; 
import '@testing-library/jest-dom';
import { formSchema } from '../Interfaces/dynamicForm.interface';

test('disables submit button after click', () => {
  render(<DynamicForm schema={formSchema} />); 
  const submitButton = screen.getByRole('button', { name: /submit/i });
  
  fireEvent.click(submitButton);
  
  expect(submitButton).toBeDisabled();
});

test('downloads JSON when download button is clicked', () => {
  render(<DynamicForm schema={formSchema} />);
  const formData = { field1: 'value1', field2: 'value2' };  // Example form data
  const downloadButton = screen.getByRole('button', { name: /download as json/i });

  const downloadJSON = jest.fn();
  downloadButton.onclick = () => downloadJSON(formData);

  fireEvent.click(downloadButton);

  expect(downloadJSON).toHaveBeenCalledWith(formData);
});

test('shows validation errors for empty fields', () => {
  render(<DynamicForm schema={formSchema} />);
  const submitButton = screen.getByRole('button', { name: /submit/i });

  fireEvent.click(submitButton);
  const errorMessage = screen.getByText(/this field is required/i);
  expect(errorMessage).toBeInTheDocument();
});
