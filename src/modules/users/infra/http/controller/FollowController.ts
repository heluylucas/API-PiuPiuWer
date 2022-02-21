import { Request, Response } from "express"
import { container  } from "tsyringe";
import FollowUserService from "@modules/users/services/FollowUserService";

export default class FollowController {
  public async create (request: Request, response: Response): Promise<Response> {
    try{
      const { user_id } = request.body
      const user2_id = request.user.id
  
      const followUser = container.resolve(FollowUserService);
      const follow = await followUser.execute({
        user_id: user_id, 
        user2_id
      })
  
      return response.json(follow);
    } catch (err: any) {
      return response.status(400).json({ error: err.message });
    }
  }
}