import React, { useState } from 'react';

const Faq = () => {
  const [faqs, setFaqs] = useState([
    { question: '', answer: '' } // Initial empty FAQ entry
  ]);

  const handleQuestionChange = (event, index) => {
    const newFaqs = [...faqs];
    newFaqs[index].question = event.target.value;
    setFaqs(newFaqs);
  };

  const handleAnswerChange = (event, index) => {
    const newFaqs = [...faqs];
    newFaqs[index].answer = event.target.value;
    setFaqs(newFaqs);
  };

  const addFAQ = () => {
    setFaqs([...faqs, { question: '', answer: '' }]);
  };

  const deleteFAQ = (index) => {
    const newFaqs = [...faqs];
    newFaqs.splice(index, 1);
    setFaqs(newFaqs);
  };

  return (
    <div>
      {faqs.map((faq, index) => (
        <div key={index} className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder={`Question ${index + 1}`}
            value={faq.question}
            onChange={(e) => handleQuestionChange(e, index)}
          />
          <textarea
            className="form-control"
            placeholder="Answer"
            value={faq.answer}
            onChange={(e) => handleAnswerChange(e, index)}
          ></textarea>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => deleteFAQ(index)}
          >
            Delete FAQ
          </button>
        </div>
      ))}
      <button type="button" className="btn btn-primary" onClick={addFAQ}>
        Add FAQ
      </button>
    </div>
  );
};

export default Faq;
