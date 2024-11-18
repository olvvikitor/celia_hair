import { Inject, Injectable } from '@nestjs/common';
import { Cliente, Prisma } from '@prisma/client';
import { IClienteRepository } from 'src/cliente/core/repositories/core.cliente..repository';
import { PrismaService } from 'src/shared/infra/prisma/prisma.service';

@Injectable()
export class ClienteRepository implements IClienteRepository<Cliente>{
  constructor (
    @Inject()
    private prismaService : PrismaService) {}
  async create(data: Prisma.ClienteCreateInput):Promise<Cliente>{
    return await this.prismaService.cliente.create({data})
  }
}