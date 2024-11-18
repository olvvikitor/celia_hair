import { OmitType } from '@nestjs/mapped-types';
import { Cliente } from '../entities/cliente';

export class CreateClientDto extends OmitType(Cliente, ['id']){
}