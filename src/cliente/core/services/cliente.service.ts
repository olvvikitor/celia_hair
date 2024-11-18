import { ClienteRepository } from 'src/cliente/infra/prisma/repositories/cliente.prisma.repository';
import { CreateClientDto } from '../dto/create-client-dto';
import { Cliente } from '../entities/cliente';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ClienteService{
  constructor (@Inject() private clienteRepository : ClienteRepository) {
  }
  async create(createClientDto : CreateClientDto):Promise<Cliente>{

    const cliente = await this.clienteRepository.create({
      email: createClientDto.email,
      nome: createClientDto.name
    })
    return{
      email: cliente.email,
      name: cliente.nome,
      id: cliente.id
    }
  }
}