
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import '../css/PolicyRulesForm.css'; // Import the CSS file

function Faq({ faq = { question: '', answer: '' }, index, onChange, onDelete, showDeleteButton = true, canDelete = true }) {
  const handleInputChange = (event) => {
    onChange(event, index);
  };

  const handleDelete = () => {
    if (canDelete) {
      onDelete(index);
    }
  };

  return (
    <div className="faq-container">
      <label className='faqlabel'>FAQs</label>
      <div className="faqitem">
        <label className='faqname'>Add Questions ?</label>
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
        {showDeleteButton && (
          <button
            type="button"
            className={`btn btn-outline-danger btn-delete-faq ${canDelete ? '' : 'disabled'}`}
            onClick={handleDelete} // Use the onDelete function passed as prop conditionally
            disabled={!canDelete}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
      </div>
    </div>
  );
}

Faq.propTypes = {
  faq: PropTypes.shape({
    question: PropTypes.string,
    answer: PropTypes.string,
  }),
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  showDeleteButton: PropTypes.bool, // Prop to conditionally show the delete button
  canDelete: PropTypes.bool, // Prop to conditionally allow deletion
};

export default Faq;
