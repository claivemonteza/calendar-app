import { IAgendar } from "./agendar";

export interface IMarcacao {
    date?: Date;
    agendamentos?: IAgendar[];
}