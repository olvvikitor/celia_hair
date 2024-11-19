import { Inject, Injectable } from '@nestjs/common';
import { Agendamento } from '../entities/agendamento';
import { IAgendamentoRepository } from '../repositories/core.agendamento.repository';
import { viewAgendamentoDto } from '../dto/view-agendamento-dto';
import { IClienteRepository } from 'src/cliente/core/repositories/core.cliente..repository';
import { IServicoRepository } from 'src/servicos/core/repositories/core.servico.repository';
import { Servico } from 'src/servicos/core/entities/servico';
import { Cliente } from 'src/cliente/core/entities/cliente';
import * as moment from 'moment-timezone';
@Injectable()
export class ShowAllAgendamentoService{
  constructor ( @Inject('IAgendamentoRepository') private agendamentoRepository: IAgendamentoRepository<Agendamento>,
  @Inject('IServicoRepository') private servicoRepository: IServicoRepository<Servico>,
  @Inject('IClienteRepository') private clienteRepository: IClienteRepository<Cliente>) {
  }
  async showAll():Promise<viewAgendamentoDto[]>{
    const agendamentos = await this.agendamentoRepository.findAll();

    const agendamentoDto = Promise.all(agendamentos.map(async(agendamento) => {
    const client = await this.clienteRepository.findById(agendamento.clienteId)
    const service = await this.servicoRepository.findById(agendamento.servicoId)
      const agendamentoMapped:viewAgendamentoDto={
        cliente: {email: client.email, nome: client.nome},
        servico: {duracao: service.duracao, nome: service.nome, preco: service.preco },
        data: moment(agendamento.data).tz('America/Sao_Paulo', true).format(),
      }
      return agendamentoMapped
    }))

    return agendamentoDto
  }
}