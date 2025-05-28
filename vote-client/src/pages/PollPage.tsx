import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api';
import { cable } from '../cable';
import { Poll, Vote } from '../types';

export default function PollPage() {
  const { id } = useParams<{ id: string }>();
  const [poll, setPoll] = useState<Poll | null>(null);

  useEffect(() => {
    api.get<Poll>(`/polls/${id}`).then((res) => setPoll(res.data));
  }, [id]);

  useEffect(() => {
    if (!poll) return;

    const subscription = cable.subscriptions.create(
      { channel: 'PollChannel', poll_id: poll.id },
      {
        received: (data: Vote) => {
          setPoll((prev) => {
            if (!prev) return prev;
            return { ...prev, votes: [...prev.votes, data] };
          });
        },
      }
    );

    return () => subscription.unsubscribe();
  }, [poll?.id]);

  const handleVote = (option: string) => {
    api.post('/votes', {
      vote: { poll_id: poll?.id, option },
    });
  };

  const getCount = (option: string) =>
    poll?.votes.filter((v) => v.option === option).length ?? 0;

  if (!poll) return <p>Loading...</p>;

  return (
    <div className="poll-container dark-theme">
      <h1>{poll.title}</h1>
      <div className="poll-actions">
        <a href={`/polls/${poll.id}/edit`} className="edit-link">
          Edit
        </a>
      </div>
      <div className="vote-options">
        {poll.options.map((option) => (
          <button 
            key={option} 
            onClick={() => handleVote(option)}
            className="vote-btn"
          >
            <span className="option-text">{option}</span>
            <span className="vote-count">{getCount(option)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}