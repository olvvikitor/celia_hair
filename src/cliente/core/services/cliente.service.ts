import { ClienteRepository } from 'src/cliente/infra/prisma/repositories/cliente.prisma.repository';
import { CreateClientDto } from '../dto/create-client-dto';
import { Cliente } from '../entities/cliente';
import { Inject, Injectable } from '@nestjs/common';
import { IClienteRepository } from '../repositories/core.cliente..repository';

@Injectable()
export class ClienteService{
  constructor (@Inject('IClienteRepository') private clienteRepository : IClienteRepository<Cliente> ) {
  }
  async create(createClientDto : CreateClientDto):Promise<Cliente>{

    const cliente:Cliente = await this.clienteRepository.create({
      email: createClientDto.email,
      nome: createClientDto.nome
    })
    
    return{
      email: cliente.email,
      nome: cliente.nome,
      id: cliente.id
    }
  }
}