import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

export default function NewPollPage() {
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleOptionChange = (idx: number, value: string) => {
    setOptions((opts) => opts.map((opt, i) => (i === idx ? value : opt)));
  };

  const addOption = () => setOptions((opts) => [...opts, '']);
  const removeOption = (idx: number) => {
    if (options.length <= 2) return;
    setOptions((opts) => opts.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const filteredOptions = options.map((o) => o.trim()).filter((o) => o);
    if (!title.trim()) {
      setError('Please enter a poll title');
      return;
    }
    if (filteredOptions.length < 2) {
      setError('Minimum 2 options required');
      return;
    }
    setError('');
    try {
      const res = await api.post('/polls', {
        title: title.trim(),
        options: filteredOptions,
      });
      navigate(`/polls/${res.data.id}`);
    } catch (err) {
      setError('Error creating poll');
    }
  };

  return (
    <div className="dark-theme">
      <div className="card-container">
        <h2 className="card-title">Create Poll</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input"
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>Options:</label>
            {options.map((opt, idx) => (
              <div key={idx} className="option-row">
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => handleOptionChange(idx, e.target.value)}
                  className="form-input"
                  required
                />
                {options.length > 2 && (
                  <button 
                    type="button" 
                    onClick={() => removeOption(idx)} 
                    className="remove-btn"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addOption} className="add-btn">
              Add Option
            </button>
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="submit-btn">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}