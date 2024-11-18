import { Body, Controller, Inject, Injectable, Post } from '@nestjs/common';
import { CreateClientDto } from 'src/cliente/core/dto/create-client-dto';
import { ClienteService } from 'src/cliente/core/services/cliente.service';

@Injectable()
@Controller('cliente')
export class ClienteController{
  constructor (
    @Inject() private clienteService : ClienteService) {
  }
  @Post()
  async create(@Body() createCLienteDto:CreateClientDto){
    return await this.clienteService.create(createCLienteDto)
  }
}