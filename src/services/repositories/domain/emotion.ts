export interface Emotion {
  id: number;
  user_id: number;
  name: string;
  description: string;
  bodyPart: string;
  created_at: Date | null;
  updated_at: Date | null;
}
