import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CreateAgendamentoDto } from 'src/agendamentos/core/dto/create-agendamento-dto';
import { CreateAgendamentoService } from 'src/agendamentos/core/services/create-agendamento.service';

@Injectable()
@Controller('agendamento')
export class AgendamentoController{
  constructor (
    private readonly moduleRefs:ModuleRef
  ) { }
  @Post()
  async createAgendamento(@Body() createAgendamentoDto:CreateAgendamentoDto){
    const createAgendamentoService = await this.moduleRefs.resolve(CreateAgendamentoService)
    
    return await createAgendamentoService.create(createAgendamentoDto)
  }
}