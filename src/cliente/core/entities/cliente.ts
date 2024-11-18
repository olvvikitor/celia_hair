import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class Cliente {
  @IsNotEmpty()
  id: any
  @IsString() @IsNotEmpty()
  nome: string 
  @IsEmail() @IsNotEmpty()
  email: string 
}