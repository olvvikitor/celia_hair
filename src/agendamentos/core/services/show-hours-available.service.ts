import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IAgendamentoRepository } from '../repositories/core.agendamento.repository';
import { Agendamento } from '../entities/agendamento';
import { IServicoRepository } from 'src/servicos/core/repositories/core.servico.repository';
import { Servico } from 'src/servicos/core/entities/servico';
import * as moment from 'moment-timezone';

@Injectable()
export class ShowHoursAvailable{
  constructor (
    @Inject('IAgendamentoRepository') private agendamentoRepository:IAgendamentoRepository<Agendamento>,
    @Inject('IServicoRepository') private servicoRepository:IServicoRepository<Servico>
  ) {}

  async execute(idServico: number, data: Date):Promise<String[] | boolean>{
    const dataEscolhida = new Date(data);
    const inicioDia = new Date(dataEscolhida);
    inicioDia.setHours(8, 30, 0, 0);
    const finalDia = new Date(dataEscolhida);
    finalDia.setHours(19, 0, 0, 0);
  
    const servicoDesejado = await this.servicoRepository.findById(idServico);
    if (!servicoDesejado) {
      throw new NotFoundException();
    }
  
    // Verifica se a data está dentro do horário de funcionamento
    if (dataEscolhida < inicioDia || dataEscolhida > finalDia) {
      return false;
    }
    const agendamentos = await this.agendamentoRepository.findByDia(inicioDia, finalDia)
    
    const duracaoServico = moment.duration(servicoDesejado.duracao, 'hours');
    const intervalo = moment.duration(5, 'minutes')
      // Cria intervalos de horários
    const horariosDisponiveis = [];
    let proximoHorario = moment(inicioDia).clone()
    
    while(proximoHorario.isBefore(moment(finalDia))){
      const isDisponivel =  await Promise.all(agendamentos.map(async (agendamento)=>{
        const inicioAgendamento = moment(agendamento.data).tz('America/Sao_Paulo', true);
        const servicoAgendado = await this.servicoRepository.findById(agendamento.servicoId)
        const fimAgendamento = inicioAgendamento.clone().add(moment.duration(servicoAgendado.duracao, 'hours')).tz('America/Sao_Paulo', true);
        const fimDoIntervalo = proximoHorario.clone().add(duracaoServico).tz('America/Sao_Paulo', true);
        return (
          fimDoIntervalo.isSameOrBefore(inicioAgendamento) || proximoHorario.isSameOrAfter(fimAgendamento)
        )
      }))
    if (isDisponivel.every(Boolean)) { // Verifica se todos os horários estão disponíveis
        horariosDisponiveis.push(proximoHorario.format('HH:mm'));
      }
      // Avança para o próximo intervalo
      proximoHorario.add(intervalo);
    }
    return horariosDisponiveis
  }
}
