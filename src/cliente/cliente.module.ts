import { Module } from '@nestjs/common';
import { ClienteRepository } from './infra/prisma/repositories/cliente.prisma.repository';
import { ClienteService } from './core/services/cliente.service';
import { ClienteController } from './infra/controllers/cliente.controller';
import { PrismaModule } from 'src/shared/infra/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers:[ClienteController],
  providers:[{provide: 'IClienteRepository', useClass:ClienteRepository}, ClienteService],
  exports: ['IClienteRepository', ClienteService]
})
export class CLienteModule{

}