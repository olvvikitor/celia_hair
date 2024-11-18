import { OmitType } from '@nestjs/mapped-types'
import { Cliente } from 'src/cliente/core/entities/cliente'
import { Servico } from 'src/servicos/core/entities/servico'
import { Agendamento } from '../entities/agendamento'

export class CreateAgendamentoDto extends OmitType(Agendamento, ['servico','cliente', 'realizado', 'id']){
  data : Date
  servicoId : number
  clienteId : number
}