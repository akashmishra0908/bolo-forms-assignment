import React, { useState, useEffect } from "react";
import axios from "axios";
import CategorizeInput from "../CategorizeInput";
import ClozeInput from "../ClozeInput";
import ComprehensionInput from "../ComprehensionInput";

const FormPreview = ({ formId: propFormId }) => {
  const [formData, setFormData] = useState(null);
  const [responses, setResponses] = useState({});
  const [formId, setFormId] = useState(propFormId || null);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        if (formId) {
          const response = await axios.get(
            `https://bolo-forms-33x3.onrender.com/api/forms/${formId}`
          );
          setFormData(response.data);
          console.log(response.data)
        }
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };
  
    fetchFormData();
  }, [formId]);
  

  const handleResponseChange = (questionId, response) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: response,
    }));
  };
console.log(responses)
  const submitForm = async () => {
    console.log("sub,itted",formId); 
    console.log(JSON.stringify(responses) +"at line no 38");
    try {
      const response = await axios.post(
        `https://bolo-forms-33x3.onrender.com/api/forms/${formId}/submit`,
        {
       responses
        }
      );
      console.log("Form submitted:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error.message);
      // if (error.response) {
      //   console.error("Server response data:", error.response.data);
      //   console.error("Server response status:", error.response.status);
      //   console.error("Server response headers:", error.response.headers);
      // }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Form Preview</h2>
      {formData ? (
        <>
          <h3 className="text-xl font-semibold mb-2">{formData.title}</h3>
          {formData.headerImage && (
            <img
              className="mb-4 rounded-lg"
              src={formData.headerImage}
              alt="Header"
            />
          )}

          {formData.questions.map((question) => (
            <div key={question._id} className="mb-8">
              <p className="text-lg mb-2">{question.content}</p>
              {question.image && (
                <img
                  className="mb-4 rounded-lg"
                  src={question.image}
                  alt="Question"
                />
              )}
              {question.type === "Categorize" && (
                <CategorizeInput
                  onChange={(response) =>
                    handleResponseChange(question._id, response)
                  }
                />
              )}
              {question.type === "Cloze" && (
                <ClozeInput
                  onChange={(response) =>
                    handleResponseChange(question._id, response)
                  }
                />
              )}
              {question.type === "Comprehension" && (
                <ComprehensionInput
                  onChange={(response) =>
                    handleResponseChange(question._id, response)
                  }
                />
              )}
            </div>
          ))}

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            onClick={submitForm}
          >
            Submit Form
          </button>
        </>
      ) : (
        <div className="text-center mt-8">Empty...</div>
      )}
    </div>
  );
};

export default FormPreview;
