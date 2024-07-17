import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function FaqList({ faq, index, onChange, onDelete }) {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    onChange({ ...faq, [name]: value }, index);
  };

  return (
    <div className="faq-item">
      <input
        type="text"
        className="form-control"
        placeholder="Question"
        name="question"
        value={faq.question}
        onChange={handleInputChange}
      />
      <textarea
        className="form-control"
        placeholder="Answer"
        name="answer"
        value={faq.answer}
        onChange={handleInputChange}
      />
      <button
        type="button"
        className="btn btn-outline-danger btn-delete-faq"
        onClick={() => onDelete(index)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
}

Faq.propTypes = {
  faq: PropTypes.shape({
    question: PropTypes.string,
    answer: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default FaqList;
