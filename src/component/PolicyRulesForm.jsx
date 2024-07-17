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
        {/* Always display at least one input field for Policy Rules */}
        <div className="policy-rule">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Policy Rule 1"
              value={policyRules.length > 0 ? policyRules[0] : ''}
              onChange={(e) => handlePolicyRuleChange(e, 0)}
            />
            <div className="input-group-append">
              
            </div>
          </div>
        </div>
        {policyRules.slice(1).map((rule, index) => (
          <div key={index} className="policy-rule">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder={`Policy Rule ${index + 2}`}
                value={rule}
                onChange={(e) => handlePolicyRuleChange(e, index + 1)}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => deletePolicyRule(index + 1)}
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
        {/* Always display at least one input field for Home Rules */}
        <div className="home-rule">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Home Rule 1"
              value={homeRules.length > 0 ? homeRules[0] : ''}
              onChange={(e) => handleHomeRuleChange(e, 0)}
            />
            <div className="input-group-append">
             
            </div>
          </div>
        </div>
        {homeRules.slice(1).map((rule, index) => (
          <div key={index} className="home-rule">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder={`Home Rule ${index + 2}`}
                value={rule}
                onChange={(e) => handleHomeRuleChange(e, index + 1)}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => deleteHomeRule(index + 1)}
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
