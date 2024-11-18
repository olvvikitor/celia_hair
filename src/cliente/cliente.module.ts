import { Module } from '@nestjs/common';
import { ClienteRepository } from './infra/prisma/repositories/cliente.prisma.repository';
import { ClienteService } from './core/services/cliente.service';
import { ClienteController } from './infra/controllers/cliente.controller';
import { PrismaModule } from 'src/infra/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers:[ClienteController],
  providers:[ClienteRepository, ClienteService],
  exports: [ClienteRepository, ClienteService]
})
export class CLienteModule{

}