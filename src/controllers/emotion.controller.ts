import { ApplicationException } from '../common/exceptions/application.exceptions';
import { Request, Response } from 'express';
import { route, GET, POST, PUT, DELETE } from 'awilix-express';
import { BaseController } from '../common/controllers/base.controller';
import { EmotionService } from '../services/emotion.service';
import { EmotionCreateDto } from '../dtos/emotion.dto';
import { emotionRequest } from '../requests/emotion.validator.request';

@route('/emotions')
export class EmotionController extends BaseController {
  constructor(private readonly emotionService: EmotionService) {
    super();
  }

  @GET()
  public async all(req: Request, res: Response): Promise<void> {
    try {
      res.send(await this.emotionService.all());
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @route('/user/:userId')
  @GET()
  public async allByUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.userId);
      res.send(await this.emotionService.findAllByUser(userId));
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @route('/:id')
  @GET()
  public async find(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id);

      const result = await this.emotionService.find(id);

      if (result) {
        return res.send(result);
      }

      return res.status(404).send('Not Found');
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @POST()
  public async store(req: Request, res: Response): Promise<any> {
    const validate = emotionRequest(req);

    if (validate) {
      throw new ApplicationException(validate);
    }

    try {
      const emotion = {
        user_id: parseInt(req.body.user_id),
        name: req.body.name,
        description: req.body.description,
        bodyPart: req.body.bodyPart,
      };

      await this.emotionService.store(emotion as EmotionCreateDto);
      return res.status(201).send();
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @route('/:id')
  @PUT()
  public async update(req: Request, res: Response): Promise<any> {
    const validate = emotionRequest(req);

    if (validate) {
      throw new ApplicationException(validate);
    }

    try {
      const id = parseInt(req.params.id);
      return res.send(
        await this.emotionService.update(id, {
          user_id: req.body.user_id,
          name: req.body.name,
          description: req.body.description,
          bodyPart: req.body.bodyPart,
        })
      );
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @route('/:id')
  @DELETE()
  public async remove(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id);
      const emotion = await this.emotionService.find(id);

      if (!emotion) {
        return res.send({ data: `Emotion with id: ${id} not found!` });
      }

      await this.emotionService.remove(id);
      res.send({ data: 'Emotion removed succesfully' });
    } catch (error) {
      this.handleException(error, res);
    }
  }
}
