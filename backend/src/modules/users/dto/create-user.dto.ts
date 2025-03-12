import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  @IsNotEmpty()
  idUsuario: number;

  @IsString()
  @IsNotEmpty()
  nombres: string;

  @IsNumber()
  @IsNotEmpty()
  telefono: number;

  @IsString()
  @IsNotEmpty()
  direccion: string;
}
