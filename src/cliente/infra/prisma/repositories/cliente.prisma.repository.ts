import { Inject, Injectable } from '@nestjs/common';
import { Cliente, Prisma } from '@prisma/client';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class ClienteRepository{
  constructor (
    @Inject()
    private prismaService : PrismaService) {}
  async create(data: Prisma.ClienteCreateInput):Promise<Cliente>{
    return await this.prismaService.cliente.create({data})
  }
}