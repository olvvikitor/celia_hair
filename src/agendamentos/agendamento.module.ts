import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/infra/prisma/prisma.service';
import { AgendamentoController } from './infra/controllers/agendamento.controller';
import { PrismaAgendamentoRepository } from './infra/prisma/repositories/prisma.agendamento.repository';
import { CreateAgendamentoService } from './core/services/create-agendamento.service';
import { PrismaModule } from 'src/shared/infra/prisma/prisma.module';
import { ServicoModule } from 'src/servicos/servico.module';

@Module({
  imports:[PrismaModule, ServicoModule],
  controllers:[AgendamentoController],
  providers:[{provide:'IAgendamentoRepository', useClass:PrismaAgendamentoRepository}, CreateAgendamentoService]
})
export class AgendamentoModule{}