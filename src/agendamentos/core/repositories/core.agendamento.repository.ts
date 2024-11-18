import { CreateAgendamentoDto } from '../dto/create-agendamento-dto';

export interface IAgendamentoRepository<T>{
  create(data : CreateAgendamentoDto):Promise<T>
  findByDia(inicioDia: Date, finalDia:Date):Promise<T[]>
}