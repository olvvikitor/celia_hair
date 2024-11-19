import { CreateClientDto } from '../dto/create-client-dto';

export interface IClienteRepository<T>{
  create(data : CreateClientDto):Promise<T>
  findById(id:any):Promise<T>
}