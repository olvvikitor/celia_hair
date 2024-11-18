import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class Servico{
  @IsNotEmpty()
  id: number
  @IsString() @IsNotEmpty()
  nome: string
  @IsNumber() @IsNotEmpty()
  preco:number
  @IsNumber() @IsNotEmpty()
  duracao:number
}