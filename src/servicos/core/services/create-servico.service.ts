import { Inject, Injectable } from '@nestjs/common';
import { PrismaServicoRepository } from 'src/servicos/infra/prisma/repositories/prisma.servico.repository';
import { CreateServicoDto } from '../dto/create-servico-dto';
import { Servico } from '../entities/servico';
import { IServicoRepository } from '../repositories/core.servico.repository';

@Injectable()
export class CreateServico{
  constructor (
    @Inject('IServicoRepository')
    private servicoRepository:IServicoRepository<Servico>) {
  }
  async createServico(createServicoDto:CreateServicoDto):Promise<Servico>{
    const servicoPersitence = await this.servicoRepository.create(createServicoDto)

    const servico:Servico ={
      duracao : servicoPersitence.duracao,
      id : servicoPersitence.id,
      nome: servicoPersitence.nome,
      preco : servicoPersitence.preco
    }
    
    return servico
  }
}