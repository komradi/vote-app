export type Vote = {
  id: number;
  option: string;
  poll_id: number;
};

export type Poll = {
  id: number;
  title: string;
  options: string[];
  votes: Vote[];
};
