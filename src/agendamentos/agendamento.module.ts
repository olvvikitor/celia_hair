import { Module } from '@nestjs/common';
import { AgendamentoController } from './infra/controllers/agendamento.controller';
import { PrismaAgendamentoRepository } from './infra/prisma/repositories/prisma.agendamento.repository';
import { CreateAgendamentoService } from './core/services/create-agendamento.service';
import { PrismaModule } from 'src/shared/infra/prisma/prisma.module';
import { ServicoModule } from 'src/servicos/servico.module';
import { CLienteModule } from 'src/cliente/cliente.module';
import { ShowAllAgendamentoService } from './core/services/show-all-agendamento.service';
import { ShowHoursAvailable } from './core/services/show-hours-available.service';

@Module({
  imports:[PrismaModule, ServicoModule, CLienteModule],
  controllers:[AgendamentoController],
  providers:[{provide:'IAgendamentoRepository', useClass:PrismaAgendamentoRepository}, CreateAgendamentoService, ShowAllAgendamentoService, ShowHoursAvailable]
})
export class AgendamentoModule{}