import { Request, Response } from 'express';
import { route, GET, POST, DELETE } from 'awilix-express';
import { ApplicationException } from '../common/exceptions/application.exceptions';
import { BaseController } from '../common/controllers/base.controller';
import { UserService } from '../services/user.service';
import { UserCreateDto } from '../dtos/user.dto';
import jwt from 'jsonwebtoken';
import Joi from 'joi';

import { userRequest } from '../requests/user.validator.request';

@route('/users')
export class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  @GET()
  public async all(req: Request, res: Response): Promise<void> {
    try {
      res.send(await this.userService.all());
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @route('/:id')
  @GET()
  public async find(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id);

      const result = await this.userService.find(id);

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
    const schema = Joi.object().keys({
      document: Joi.string().required().length(11),
    });

    if (schema.validate(req.body).error) {
      res.status(400).send('Error: Bad request');
    }

    try {
      const user = {
        document: parseInt(req.body.document),
      };

      await this.userService.store(user as UserCreateDto);
      return res.status(201).send();
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @route('/login')
  @POST()
  public async authenticate(req: Request, res: Response): Promise<any> {
    const secretKey = process.env.jwt_secret_key ?? '';

    const validate = userRequest(req);

    if (validate) {
      throw new ApplicationException(validate);
    }

    try {
      const result = await this.userService.find(req.body.document);

      if (!result) {
        throw new ApplicationException('Bad credentials');
      }

      if (secretKey === '') {
        throw new ApplicationException('Secret Key is not defined');
      }

      const token = jwt.sign({ document: result.document }, secretKey, {
        expiresIn: '1h',
      });
      res.send(token);
    } catch (error) {
      this.handleException(error, res);
    }
  }

  @route('/:id')
  @DELETE()
  public async remove(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id);
      const user = await this.userService.find(id);

      if (!user) {
        return res.send({ data: `User with id: ${id} not found!` });
      }

      await this.userService.remove(id);
      res.send({ data: 'User removed succesfully' });
    } catch (error) {
      this.handleException(error, res);
    }
  }
}
