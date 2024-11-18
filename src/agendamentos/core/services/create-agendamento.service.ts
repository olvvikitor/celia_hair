import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IAgendamentoRepository } from '../repositories/core.agendamento.repository';
import { Agendamento } from '../entities/agendamento';
import { CreateAgendamentoDto } from '../dto/create-agendamento-dto';
import { IServicoRepository } from 'src/servicos/core/repositories/core.servico.repository';
import { Servico } from 'src/servicos/core/entities/servico';

@Injectable()
export class CreateAgendamentoService{
  constructor (
    @Inject('IAgendamentoRepository') private agendamentoRepository:IAgendamentoRepository<Agendamento>,
    @Inject('IServicoRepository') private servicoRepository:IServicoRepository<Servico>
  ){}
  async create(createAgendamentoDto:CreateAgendamentoDto):Promise<Agendamento>{


    const agendamentoPersistence = await this.agendamentoRepository.create(createAgendamentoDto)
    
    return agendamentoPersistence
  }
 
  private async verificarDisponibilidade(data: Date, idServico:any):Promise<boolean>{

    const servico = await this.servicoRepository.findById(idServico)

    if(!servico){
      throw new NotFoundException
    }

    const inicioDia = new Date(data)
    inicioDia.setHours(0,0,0,0)
    const finalDia = new Date(data)
    finalDia.setHours(23, 59, 59, 99)

    const agendamentos = await this.agendamentoRepository.findByDia(inicioDia, finalDia)

    

  }
}