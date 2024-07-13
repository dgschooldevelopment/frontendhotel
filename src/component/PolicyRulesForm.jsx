import React from 'react';
import '../css/PolicyRulesForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const PolicyRulesForm = ({
  policyRules,
  homeRules,
  handlePolicyRuleChange,
  handleHomeRuleChange,
  addPolicyRule,
  addHomeRule,
  deletePolicyRule,
  deleteHomeRule,
}) => {
  return (
    <div>
      <div className="form-group">
        <label htmlFor="policyRules" className="policyrule">
          Policy Rules:
        </label>
        {/* Display the default "1 point" rule if policyRules is empty */}
        {policyRules.length === 0 && (
          <div className="policy-rule">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Policy Rule 1"
                readOnly
              />
            </div>
          </div>
        )}
        {policyRules.map((rule, index) => (
          <div key={index} className="policy-rule">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder={`Policy Rule ${index + 1}`}
                value={rule}
                onChange={(e) => handlePolicyRuleChange(e, index)}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => deletePolicyRule(index)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </div>
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-primary" onClick={addPolicyRule}>
          Add Policy Rule
        </button>
      </div>

      <div className="form-group">
        <label htmlFor="homeRules" className="policyrule">
          Home Rules:
        </label>
        {/* Display the default "1 point" rule if homeRules is empty */}
        {homeRules.length === 0 && (
          <div className="home-rule">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Home Rule 1"
                readOnly
              />
            </div>
          </div>
        )}
        {homeRules.map((rule, index) => (
          <div key={index} className="home-rule">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder={`Home Rule ${index + 1}`}
                value={rule}
                onChange={(e) => handleHomeRuleChange(e, index)}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => deleteHomeRule(index)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </div>
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-primary" onClick={addHomeRule}>
          Add Home Rule
        </button>
      </div>
    </div>
  );
};

export default PolicyRulesForm;
