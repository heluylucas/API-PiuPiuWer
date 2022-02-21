import { Request, Response } from "express"
import { container  } from "tsyringe";
import CreatePiuService from "@modules/pius/services/CreatePiuService";
import ShowPiuService from "@modules/pius/services/ShowPiuService";
import DeletePiuService from "@modules/pius/services/DeletePiuService";

export default class PiusController {
  public async create (request: Request, response: Response): Promise<Response> {
    try{
      const { text } = request.body
      const user_id = request.user.id;
  
      const createPiu = container.resolve(CreatePiuService);
  
      const piu = await createPiu.execute({
        text,
        user_id,
      })
  
      return response.json(piu);
    } catch (err: any) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async show (request: Request, response: Response): Promise<Response> {
    const showPiusService = container.resolve(ShowPiuService)

    const showPius = await showPiusService.execute();

    return response.json(showPius);
  }

  public async delete (request: Request, response: Response): Promise<Response> {
    const { piu_id } = request.body
    const user_id = request.user.id;

    const deletePiusService = container.resolve(DeletePiuService)
    await deletePiusService.execute({piu_id: piu_id, user_id: user_id});

    return response.json({deleted: true});
  }
}