import prisma from "../prisma/prisma";
import { UserDTO } from "../models/user.model";

class UserService {
  async getAllUsers() {
    return prisma.user.findMany();
  }

  async getUserById(id: number) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async createUser(data: UserDTO) {
    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
      },
    });
  }

  async updateUser(id: number, data: UserDTO) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: number) {
    return prisma.user.delete({
      where: { id },
    });
  }
}

export default new UserService();
