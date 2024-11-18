import { Inject, Injectable } from '@nestjs/common';
import { Agendamento, Prisma } from '@prisma/client';
import { CreateAgendamentoDto } from 'src/agendamentos/core/dto/create-agendamento-dto';
import { IAgendamentoRepository } from 'src/agendamentos/core/repositories/core.agendamento.repository';
import { PrismaService } from 'src/shared/infra/prisma/prisma.service';

@Injectable()
export class PrismaAgendamentoRepository implements IAgendamentoRepository<Agendamento>{
  constructor (
    @Inject()
    private prismaService :PrismaService) {}


    async findByDia(inicioDia: Date, finalDia:Date): Promise<Agendamento[]> {
      return await this.prismaService.agendamento.findMany({
        where:{
          data:{
            lte:finalDia,
            gte:inicioDia
          }
        }
      })
      
    }
    

  async create(data: CreateAgendamentoDto): Promise<Agendamento> {
    return await this.prismaService.agendamento.create({
      data:{
        data: data.data,
        cliente: {connect:{id: data.clienteId}},
        servico: {connect: {id: data.servicoId}}
      }
    })
  }
  
}