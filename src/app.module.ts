import { Module } from '@nestjs/common';
import { CLienteModule } from './cliente/cliente.module';
import { ServicoModule } from './servicos/servico.module';
import { AgendamentoModule } from './agendamentos/agendamento.module';


@Module({
  imports: [CLienteModule, ServicoModule, AgendamentoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
