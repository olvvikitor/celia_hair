import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IAgendamentoRepository } from '../repositories/core.agendamento.repository';
import { Agendamento } from '../entities/agendamento';
import { CreateAgendamentoDto } from '../dto/create-agendamento-dto';
import { IServicoRepository } from 'src/servicos/core/repositories/core.servico.repository';
import { Servico } from 'src/servicos/core/entities/servico';
import * as moment from 'moment-timezone';
import { viewAgendamentoDto } from '../dto/view-agendamento-dto';
import { IClienteRepository } from 'src/cliente/core/repositories/core.cliente..repository';
import { Cliente } from 'src/cliente/core/entities/cliente';

@Injectable()
export class CreateAgendamentoService {
  constructor(
    @Inject('IAgendamentoRepository') private agendamentoRepository: IAgendamentoRepository<Agendamento>,
    @Inject('IServicoRepository') private servicoRepository: IServicoRepository<Servico>,
    @Inject('IClienteRepository') private clienteRepository: IClienteRepository<Cliente>
  ) { }

  async create(createAgendamentoDto: CreateAgendamentoDto): Promise<viewAgendamentoDto> {

    console.log(moment(createAgendamentoDto.data).format('d-MM-hh:mm'))
    if (! await this.verificarDisponibilidade(createAgendamentoDto.data, createAgendamentoDto.servicoId)) {
      throw new BadRequestException('Horário indisponivel')

    }
    const agendamentoPersistence = await this.agendamentoRepository.create(createAgendamentoDto)
    const cliente = await this.clienteRepository.findById(agendamentoPersistence.clienteId)
    const servico = await this.servicoRepository.findById(agendamentoPersistence.servicoId)
    return {
      data: moment(agendamentoPersistence.data).tz('America/Sao_Paulo', true).format(),
      cliente : {email: cliente.email, nome: cliente.nome},
      servico: {duracao: servico.duracao, nome: servico.nome, preco: servico.preco}
    }
  }


  private async verificarDisponibilidade(data: Date, idServico: any): Promise<boolean> {
    
    const dataEscolhida = new Date(data);
    console.log('data escolhida ', dataEscolhida)
    const inicioDia = new Date(dataEscolhida);
    inicioDia.setHours(8, 30, 0, 0);
    const finalDia = new Date(dataEscolhida);
    finalDia.setHours(19, 0, 0, 0);
  
    const servicoDesejado = await this.servicoRepository.findById(idServico);
    if (!servicoDesejado) {
      throw new NotFoundException();
    }
    console.log('duraca servico ', servicoDesejado.duracao)
  
    // Verifica se a data está dentro do horário de funcionamento
    if (dataEscolhida < inicioDia || dataEscolhida > finalDia) {
      return false;
    }
  
    const agendamentos = await this.agendamentoRepository.findByDia(inicioDia, finalDia);
  
    // Verificar se há conflito com os agendamentos existentes
    const disponibilidade = agendamentos.every(async(agendamento) => {
      const servicoAgendado = await this.servicoRepository.findById(agendamento.servicoId)
      const inicioServico = moment(agendamento.data).tz('America/Sao_Paulo', true);
      const fimServico = moment(agendamento.data).tz('America/Sao_Paulo', true).add(servicoAgendado.duracao, 'hours');
      console.log(inicioServico, moment(agendamento.data).tz('America/Sao_Paulo', true))
      console.log(fimServico, moment(agendamento.data).tz('America/Sao_Paulo', true))
      const dataEscolhidaBrasilia = moment(dataEscolhida).tz('America/Sao_Paulo', true);
      console.log('data escolhida', dataEscolhidaBrasilia)
      
      // Verifica se o serviço desejado se sobrepõe a algum agendamento existente
      return !(
        dataEscolhidaBrasilia.isSameOrAfter(inicioServico) && dataEscolhidaBrasilia.isBefore(fimServico)
      );
    });
  
    return disponibilidade;

  }
  
}