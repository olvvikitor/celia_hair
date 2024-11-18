import { Module } from '@nestjs/common';
import { ServicoController } from './infra/prisma/repositories/controller/servico.controller';
import { CreateServico } from './core/services/create-servico.service';
import { PrismaServicoRepository } from './infra/prisma/repositories/prisma.servico.repository';
import { PrismaModule } from 'src/shared/infra/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers:[ServicoController],
  providers: [{provide:'IServicoRepository', useClass: PrismaServicoRepository}, CreateServico],
  exports:['IServicoRepository'] 
})
export class ServicoModule{}