import { Request, Response } from "express"
import { container  } from "tsyringe";
import LikePiuService from "@modules/pius/services/LikePiuService";

export default class PiusLikesController {
  public async create (request: Request, response: Response): Promise<Response> {
    try{
      const { piu_id } = request.body
      const user_id = request.user.id;

      const createLikePiu = container.resolve(LikePiuService);

      const like = await createLikePiu.execute({
        piu_id,
        user_id,
      })

      return response.json(like);
    } catch (err: any) {
      return response.status(400).json({ error: err.message });
    }
  }
}