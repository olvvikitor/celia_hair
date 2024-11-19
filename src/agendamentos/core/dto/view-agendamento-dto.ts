import { ViewClienteDto } from 'src/cliente/core/dto/view-cliente-dto'
import { Cliente } from 'src/cliente/core/entities/cliente'
import { ViewServicoDto } from 'src/servicos/core/dto/view-servico-dto'
import { Servico } from 'src/servicos/core/entities/servico'

export class viewAgendamentoDto{
  data: string
  servico: ViewServicoDto
  cliente : ViewClienteDto
}