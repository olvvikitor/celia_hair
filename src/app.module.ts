import { Module } from '@nestjs/common';
import { CLienteModule } from './cliente/cliente.module';


@Module({
  imports: [CLienteModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
