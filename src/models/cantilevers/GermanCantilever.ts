import { Cantilever } from "./Cantilever";

// Define a subclass CantileverGerman, inheriting from Cantilever.
class CantileverGerman extends Cantilever {
  // Additional property specific to CantileverGerman.
  type:'TDP<2.2' | 'TDP>2.2' | 'CAI' | 'SBA';
  alpha_superior_tube: number;
  alpha_antibalzante: number;
  alpha_atirantado:number;

  // Constructor to initialize the CantileverGerman properties.
  constructor(
    type: 'TDP<2.2' | 'TDP>2.2' | 'CAI' | 'SBA',
    contact_wire_height: number,
    system_height: number,
    zig_zag:number,
    isolator_length_1:number,
    isolator_length_2:number,
    alpha_superior_tube:number,
    alpha_antibalzante:number,
    alpha_atirantado:number,
    bitola:number,
    esc:number,
    pv:number
  ) {
    // Call the parent constructbior to initialize inherited properties.
    super(contact_wire_height, system_height, zig_zag, isolator_length_1, isolator_length_2, bitola, esc, pv );
    this.type = type;
    this.alpha_superior_tube = alpha_superior_tube;
    this.alpha_antibalzante = alpha_antibalzante;
    this.alpha_atirantado = alpha_atirantado;
  }

  degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  getFixedPointsDistance():number{
    let distance = Math.tan(this.degreesToRadians(this.alpha_superior_tube))*this.getMwAxis().x + this.system_height + 50; //TOOD: SEARCH what is this 50;
    return distance;
  }

  getFixedPoints():{x1:number,y1:number, x2:number, y2:number}{

    let x1 =  0;
    let y1 = this.getMwAxis().x+(Math.tan(this.degreesToRadians(this.alpha_superior_tube)))*this.getCwAxis().x - 123;
    let x2 =  0;
    let y2 =  y1 - this.getFixedPointsDistance();

    return { x1, y1, x2, y2 }
  }


  // Override the serialize method to include CantileverGerman-specific properties.
  serialize(): string {
    return JSON.stringify({
      contact_wire_height: this.contact_wire_height,
      system_height: this.system_height,
      zig_zag:this.zig_zag,
    });
  }

  // Deserialize data specifically for CantileverGerman.
  static deserialize(data: string): CantileverGerman {
    const parsedData = JSON.parse(data);
    return new CantileverGerman(
      parsedData.contact_wire_height,
      parsedData.zig_zag,
      parsedData.system_height,
      parsedData.isolator_length_1,
      parsedData.isolator_length_2,
      parsedData.bitola,
      parsedData.esc,
      parsedData.pv,
      parsedData.type,
      parsedData.alpha_superior_tube,
      parsedData.alpha_antibalzante,
      parsedData.alpha_atirantado,
    );
  }
}

export { CantileverGerman }
