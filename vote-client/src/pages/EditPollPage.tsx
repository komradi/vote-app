import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../api';

export default function EditPollPage() {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/polls/${id}`).then(res => {
      setTitle(res.data.title);
      setOptions(res.data.options);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

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
      await api.patch(`/polls/${id}`, {
        title: title.trim(),
        options: filteredOptions,
      });
      navigate(`/polls/${id}`);
    } catch (err) {
      setError('Error updating poll');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="dark-theme">
      <div className="card-container">
        <h2 className="card-title">Edit Poll</h2>
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
            Save
          </button>
        </form>
      </div>
    </div>
  );
}