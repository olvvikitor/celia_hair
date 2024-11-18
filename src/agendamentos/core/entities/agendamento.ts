import { Type } from 'class-transformer'
import { IsBoolean, IsDate, isDate, IsNotEmpty, IsNumber, IsObject } from 'class-validator'
import { Cliente } from 'src/cliente/core/entities/cliente'
import { Servico } from 'src/servicos/core/entities/servico'

export class Agendamento{

  @IsNotEmpty()
  id : any

  @IsNotEmpty() 
  @Type(() => Date)
  @IsDate()
  data : Date

  @IsBoolean()
  realizado : boolean

  @IsObject() @IsNotEmpty()
  servico : Servico

  @IsNotEmpty()
  servicoId : any

  @IsNotEmpty() @IsObject()
  cliente : Cliente

  @IsNotEmpty()
  clienteId : any
}