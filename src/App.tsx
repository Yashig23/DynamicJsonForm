import { useState } from "react";
import DynamicForm from './Components/dynamicForm'
import JSONEditor from './Components/jsonEditor'
import Navbar from './Components/navbar'
import { defaultSchema } from './Utils/json';

const App = () => {
  const [schema, setSchema] = useState(defaultSchema);

  const handleJSONChange = (newValue: string) => {
    try {
      const parsedSchema = JSON.parse(newValue);
      console.log("Parsed Schema:", parsedSchema);
      setSchema(parsedSchema);
    } catch (error) {
      console.error("Invalid JSON:", error);
    }
  };

  return (

   <>
   <div className="p-4 bg-slate-200">
    <Navbar/>
   </div>
    <div className="flex flex-col lg:flex-row h-screen bg-lightBg text-lightText dark:bg-darkBg dark:text-darkText">
      {/* JSON Editor Section */}
      <div className="w-full lg:w-1/2 h-full p-4 border-b lg:border-r lg:border-gray-300 flex flex-col">
        <h2 className="text-2xl font-bold mb-4 flex justify-center">JSON Editor</h2>
        <div className="flex-grow">
          <JSONEditor value={JSON.stringify(schema, null, 2)} onChange={handleJSONChange} />
        </div>
      </div>

      {/* Dynamic Form Section */}
      <div className="w-full lg:w-1/2 h-full p-4 flex flex-col">
        <h2 className="text-2xl font-bold mb-4 flex justify-center">Dynamic Form</h2>
        <div className="flex-grow">
          <DynamicForm schema={schema} />
        </div>
      </div>
    </div>
    </>


  );
};

export default App;

