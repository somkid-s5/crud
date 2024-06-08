import { Request, Response } from "express";
import userService from "../services/user.service";

class UserController {
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ error: "Internal Server Error" }); // Generic error response
    }
  }

  async getUserById(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      const user = await userService.getUserById(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ error: "Internal Server Error" }); // Generic error response
    }
  }

  async createUser(req: Request, res: Response) {
    const { name, email } = req.body;
    try {
      const user = await userService.createUser({ name, email });
      res.status(201).json(user);
    } catch (error) {
      console.error(error); // Log the error for debugging
      if (error) {
        res.status(400).json({ error }); // Validation error
      } else {
        res.status(500).json({ error: "Internal Server Error" }); // Generic error response
      }
    }
  }

  async updateUser(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { name, email } = req.body;
    try {
      const user = await userService.updateUser(id, { name, email });
      res.json(user);
    } catch (error) {
      console.error(error); // Log the error for debugging
      if (error) {
        res.status(400).json({ error }); // Validation error
      } else {
        res.status(500).json({ error: "Internal Server Error" }); // Generic error response
      }
    }
  }

  async deleteUser(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      await userService.deleteUser(id);
      res.status(204).send();
    } catch (error) {
      console.error(error); // Log the error for debugging
      if (error) {
        res.status(404).json({ error: "User not found" }); // User not found error
      } else {
        res.status(500).json({ error: "Internal Server Error" }); // Generic error response
      }
    }
  }
}

export default new UserController();
