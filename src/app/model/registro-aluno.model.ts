import { BaseConverter } from "../components/base-converter";

export class RegistroAluno {
    id: number;
    alunoId: number;
    data: Date;
    registro: string;

    get dataStr(): string {
        return BaseConverter.DateToStringOnlyDate(new Date(this.data));
    }

}
