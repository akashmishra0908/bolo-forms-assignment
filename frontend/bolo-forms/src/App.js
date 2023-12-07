import React from "react";
import FormEditor from "./components/FormEditor";
import FormPreview from "./components/FormPreview";

function App() {
  let id=localStorage.getItem("id");
  console.log(id);
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full p-6 bg-white shadow-lg rounded-md">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Form Builder App
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {/* <h2 className="text-2xl font-bold mb-4">Form Editor</h2> */}
            <FormEditor />
          </div>
          <div>
            {/* <h2 className="text-2xl font-bold mb-4">Form Preview</h2> */}
            <FormPreview  formId={id}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
