import { SelectItem } from "src/app/components/custom-select/custom-select.component";

export class PerfilEnum {
    public static Direcao =  { name: 'Direção', value: 1 };
    public static Secretaria = { name: 'Secretaria', value: 2 };
    public static Professor = { name: 'Professor', value: 3 };
    public static Aluno = { name: 'Aluno', value: 4 };

    public static List(): SelectItem<number>[] {
        return [
            PerfilEnum.Direcao,
            PerfilEnum.Secretaria,
            PerfilEnum.Professor,
            PerfilEnum.Aluno
        ];
    }

}
