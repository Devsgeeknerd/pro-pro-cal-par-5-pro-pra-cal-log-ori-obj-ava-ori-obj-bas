interface IOperacaoMatematica {
  validar(): boolean;
  calcular(): number;
}

abstract class OperacaoMatematica implements IOperacaoMatematica {
  private _numero1: number;
  private _numero2: number;

  constructor(numero1: number, numero2: number) {
    this._numero1 = numero1;
    this._numero2 = numero2;
  }

  get numero1(): number {
    return this._numero1;
  }

  get numero2(): number {
    return this._numero2;
  }

  public validar(): boolean {
    return this._numero1 >= 0 && this._numero2 >= 0;
  }

  public calcular(): number {
    if (this.validar()) {
      return this.realizarCalculo();
    } else {
      return -1;
    }
  }

  protected abstract realizarCalculo(): number;
}

class Soma extends OperacaoMatematica {
  protected override realizarCalculo(): number {
    return this.numero1 + this.numero2;
  }
}

class Subtracao extends OperacaoMatematica {
  protected override realizarCalculo(): number {
    return this.numero1 - this.numero2;
  }
}

class Multiplicacao extends OperacaoMatematica {
  protected override realizarCalculo(): number {
    return this.numero1 * this.numero2;
  }
}

class Divisao extends OperacaoMatematica {
  public override validar(): boolean {
    return this.numero1 >= 0 && this.numero2 > 0;
  }

  protected override realizarCalculo(): number {
    return this.numero1 / this.numero2;
  }
}

class Potenciacao extends OperacaoMatematica {
  protected override realizarCalculo(): number {
    return Math.pow(this.numero1, this.numero2);
  }
}

class FabricaOperacaoMatematica {
  public static criarOperacaoMatematica(
    numero1: number,
    numero2: number,
    operacao: string
  ): IOperacaoMatematica {
    switch (operacao) {
      case "+":
        return new Soma(numero1, numero2);
      case "-":
        return new Subtracao(numero1, numero2);
      case "*":
        return new Multiplicacao(numero1, numero2);
      case "^":
        return new Potenciacao(numero1, numero2);
      default:
        return new Divisao(numero1, numero2);
    }
  }
}

class Calculadora {
  public static calcular(calculo: string): number {
    let partes = calculo.split(" ");
    let numero1 = Number(partes[0]);
    let operacao = partes[1];
    let numero2 = Number(partes[2]);
    let operacaoMatematica = FabricaOperacaoMatematica.criarOperacaoMatematica(
      numero1,
      numero2,
      operacao
    );
    return operacaoMatematica.calcular();
  }
}

// let numero1 = 4;
// let numero2 = 0; // 2
// let operacao = "/"; // +, -, *,

// // let fabricaOperacaoMatematica = new FabricaOperacaoMatematica();
// let operacaoMatematica = FabricaOperacaoMatematica.criarOperacaoMatematica(
//   numero1,
//   numero2,
//   operacao
// );

// let resultado = operacaoMatematica.calcular();

// console.log(`${numero1} ${operacao} ${numero2} = ${resultado}`);

let calculo = "10 + 10";
let resultado = Calculadora.calcular(calculo);

if (resultado >= 0) {
  console.log(`${calculo} = ${resultado}`);
} else {
  console.log("Operacao invalida!");
}
