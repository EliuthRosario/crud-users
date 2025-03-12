import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UsersService {
  private readonly filePath = path.resolve(__dirname, 'users.json');

  private async readFile(): Promise<User[]> {
    try {
      const data = await fs.promises.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        await fs.promises.writeFile(this.filePath, JSON.stringify([]));
        return [];
      }
      console.log(error);
    }
  }

  private async writeFile(users: User[]): Promise<void> {
    await fs.promises.writeFile(this.filePath, JSON.stringify(users));
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const users = await this.readFile();
    users.push(createUserDto);
    await this.writeFile(users);
    return createUserDto;
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.readFile();
      return users;
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      const users = await this.readFile();
      const user = users.find((user) => user.idUsuario === id);
      if (user) {
        return user;
      } else {
        throw new NotFoundException(`Usuario no encontrado con el id: ${id}`);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const users = await this.readFile();
      const index = users.findIndex((user) => user.idUsuario === id);
      if (index === -1) {
        throw new NotFoundException(`Usuario no encontrado con el id: ${id}`);
      }
      users[index] = { ...users[index], ...updateUserDto };
      await this.writeFile(users);
      return users[index];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const users = await this.readFile();
      const index = users.findIndex((user) => user.idUsuario === id);
      if (index === -1) {
        throw new NotFoundException(`Usuario no encontrado con el id: ${id}`);
      }
      users.splice(index, 1);
      await this.writeFile(users);
      return {
        message: `Usuario eliminado con el id: ${id}`,
        status: HttpStatus.OK,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
