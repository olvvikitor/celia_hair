import { Body, Controller, Get, Injectable, Post } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CreateAgendamentoDto } from 'src/agendamentos/core/dto/create-agendamento-dto';
import { CreateAgendamentoService } from 'src/agendamentos/core/services/create-agendamento.service';
import * as moment from 'moment-timezone';
import { ShowAllAgendamentoService } from 'src/agendamentos/core/services/show-all-agendamento.service';
import { ShowHoursAvailable } from 'src/agendamentos/core/services/show-hours-available.service';
import  {toZonedTime} from 'date-fns-tz';
@Injectable()
@Controller('agendamento')
export class AgendamentoController{
  constructor (
    private readonly moduleRefs:ModuleRef
  ) { }
  @Post()
  async createAgendamento(@Body() createAgendamentoDto:CreateAgendamentoDto){
    const createAgendamentoService = await this.moduleRefs.resolve(CreateAgendamentoService)
    //convertendo para data para brasilia
    createAgendamentoDto.data = toZonedTime(createAgendamentoDto.data, 'America/Sao_Paulo')
    
    return await createAgendamentoService.create(createAgendamentoDto)
  }
  @Get()
  async showAll(){
    const agendamentoService = await this.moduleRefs.resolve(ShowAllAgendamentoService)
    return agendamentoService.showAll()
  }
  @Get('/disponivel')
  async showDatesAvailable(@Body() body: {idServico: number, date : Date}){
    const {date, idServico} = body
    const showHoursAvalable = await this.moduleRefs.resolve(ShowHoursAvailable)
    const  dateFormat = toZonedTime(date, 'America/Sao_Paulo')
    return await showHoursAvalable.execute(idServico, dateFormat)
  }
}