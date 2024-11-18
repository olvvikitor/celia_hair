import { OmitType } from '@nestjs/mapped-types';
import { Servico } from '../entities/servico';

export class CreateServicoDto extends OmitType(Servico, ['id']){
}