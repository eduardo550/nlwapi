import {Request, Response} from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User";

class UserController {
    async create(request: Request, response: Response) {
        const { name, email } = request.body;
        
        const usersRepo = getRepository(User);
        
        const userAlreadyExists = await usersRepo.findOne({
            email
        });

        if(userAlreadyExists) {
            return response.status(400).json({
                error: "User Already Exists"
            })
        }

        const user = usersRepo.create({
            name, email
        });

        await usersRepo.save(user);
        
        return response.json(user);
    }
}

export { UserController }