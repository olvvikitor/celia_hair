import { CreateServicoDto } from '../dto/create-servico-dto';

export interface IServicoRepository<T>{
  create(data: CreateServicoDto):Promise<T>
  findById(id: any):Promise<T>
}