import React, { useState } from "react";
import axios from "axios";

const FormEditor = () => {
  const [questions, setQuestions] = useState([]);
  const [formTitle, setFormTitle] = useState("");
  const [headerImage, setHeaderImage] = useState("");

  const addQuestion = (type) => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      { type, content: "", image: "" },
    ]);
  };

  const handleQuestionChange = (index, content) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index].content = content;
      return updatedQuestions;
    });
  };

  const handleImageChange = (index, image) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index].image = image;
      return updatedQuestions;
    });
  };

  const saveForm = async () => {
    // Send data to the backend to save in MongoDB
    try {
      const response = await axios.post("https://bolo-forms-33x3.onrender.com/api/forms", {
        title: formTitle,
        headerImage:headerImage,
        questions:questions,
      });
      console.log("Form saved:", response.data);
      localStorage.setItem("id",response.data._id);
    } catch (error) {
      console.error("Error saving form:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Form Editor</h2>
      <label className="block mb-4">
        Form Title:
        <input
          className="border border-gray-300 p-2 w-full"
          type="text"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
        />
      </label>
      <label className="block mb-4">
        Header Image URL:
        <input
          className="border border-gray-300 p-2 w-full"
          type="text"
          value={headerImage}
          onChange={(e) => setHeaderImage(e.target.value)}
        />
      </label>
      <div className="mb-4 space-x-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          onClick={() => addQuestion("Categorize")}
        >
          Add Categorize Question
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
          onClick={() => addQuestion("Cloze")}
        >
          Add Cloze Question
        </button>
        <button
          className="bg-yellow-500 hover:bg-yellow-700 text-white py-2 px-4 rounded"
          onClick={() => addQuestion("Comprehension")}
        >
          Add Comprehension Question
        </button>
      </div>

      {questions.map((question, index) => (
        <div key={index} className="mb-4">
          <label className="block mb-2">
            Question Content:
            <input
              className="border border-gray-300 p-2 w-full"
              type="text"
              value={question.content}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
            />
          </label>
          <label className="block">
            Image URL:
            <input
              className="border border-gray-300 p-2 w-full"
              type="text"
              value={question.image}
              onChange={(e) => handleImageChange(index, e.target.value)}
            />
          </label>
        </div>
      ))}

      <button
        className="bg-purple-500 hover:bg-purple-700 text-white py-2 px-4 rounded"
        onClick={saveForm}
      >
        Save Form
      </button>
    </div>
  );
};

export default FormEditor;
