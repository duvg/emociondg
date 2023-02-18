import { Emotion } from './domain/emotion';

export interface EmotionRepository {
  find: (id: number) => Promise<Emotion | null>;
  findAllByUser: (userId: number) => Promise<Emotion[]>;
  all: () => Promise<Emotion[]>;
  store: (entry: Emotion) => Promise<void>;
  update: (entry: Emotion) => Promise<void>;
  remove: (id: number) => Promise<void>;
}
