import { Body, Controller, Inject, Injectable, Post } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CreateServicoDto } from 'src/servicos/core/dto/create-servico-dto';
import { CreateServico } from 'src/servicos/core/services/create-servico.service';

@Injectable()
@Controller('servicos')
export class ServicoController{
  constructor(
    @Inject()
    private readonly moduleRef: ModuleRef) {}

  @Post()
  async createServico(@Body() createServicoDto: CreateServicoDto){
    const createServicoService = await this.moduleRef.resolve(CreateServico)
    return await createServicoService.createServico(createServicoDto)
  }
}