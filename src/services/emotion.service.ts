import { ApplicationException } from '../common/exceptions/application.exceptions';
import { EmotionCreateDto } from '../dtos/emotion.dto';
import { Emotion } from './repositories/domain/emotion';
import { EmotionRepository } from './repositories/emotion.repository';

export class EmotionService {
  constructor(private readonly emotionRepository: EmotionRepository) {}

  public async find(id: number): Promise<Emotion | null> {
    return await this.emotionRepository.find(id);
  }

  public async findAllByUser(userId: number): Promise<Emotion[]> {
    return await this.emotionRepository.findAllByUser(userId);
  }

  public async all(): Promise<Emotion[]> {
    return await this.emotionRepository.all();
  }

  public async store(params: EmotionCreateDto): Promise<void> {
    await this.emotionRepository.store(params as unknown as Emotion);
  }

  public async update(id: number, params: EmotionCreateDto): Promise<void> {
    const emotion = await this.emotionRepository.find(id);

    if (emotion) {
      emotion.user_id = params.user_id;
      emotion.name = params.name;
      emotion.bodyPart = params.bodyPart;
      emotion.description = params.description;

      await this.emotionRepository.update(emotion);
    } else {
      throw new ApplicationException(`Emotion with id: ${id} not exists.`);
    }
  }

  public async remove(id: number): Promise<void> {
    return await this.emotionRepository.remove(id);
  }
}
