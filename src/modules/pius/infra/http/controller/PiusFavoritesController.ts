import { Request, Response } from "express"
import { container  } from "tsyringe";
import PiuFavoriteService from "@modules/pius/services/FavoritePiuService";
import PiuUnfavoriteService from "@modules/pius/services/UnfavoritePiuService";

export default class PiusFavoritesController {
  public async create (request: Request, response: Response): Promise<Response> {
    try{
      const { piu_id } = request.body
      const user_id = request.user.id;

      const createFavoritePiu = container.resolve(PiuFavoriteService);

      const favorite = await createFavoritePiu.execute({
        piu_id,
        user_id,
      })

      return response.json(favorite);
    } catch (err: any) {
      return response.status(400).json({ error: err.message });
    }
  }
  public async delete (request: Request, response: Response): Promise<Response> {
    try{
      const { piu_id } = request.body
      const user_id = request.user.id;

      const createUnfavoritePiu = container.resolve(PiuUnfavoriteService);

      const unfavorite = await createUnfavoritePiu.execute({
        piu_id,
        user_id,
      })

      return response.json(unfavorite);
    } catch (err: any) {
      return response.status(400).json({ error: err.message });
    }
  }
}