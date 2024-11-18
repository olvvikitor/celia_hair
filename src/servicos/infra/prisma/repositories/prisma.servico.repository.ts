import { Inject, Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, PrismaPromise, Servico } from '@prisma/client';
import { IServicoRepository } from 'src/servicos/core/repositories/core.servico.repository';
import { PrismaService } from 'src/shared/infra/prisma/prisma.service';


@Injectable()
export class PrismaServicoRepository implements IServicoRepository<Servico> {

  constructor(
    @Inject()
    private prismaService: PrismaService) { }

 async findById(id: number): Promise<Servico> {
    return await this.prismaService.servico.findUnique({
      where: {id:id}
    })
  }


  async create(data: Prisma.ServicoCreateInput): Promise<Servico> {
    return await this.prismaService.servico.create({ data })
  }
}