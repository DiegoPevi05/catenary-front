import { Cantilever } from "./Cantilever";

// Define a subclass CantileverGerman, inheriting from Cantilever.
class CantileverGerman extends Cantilever {
  // Additional property specific to CantileverGerman.
  type:'TDP<2.2' | 'TDP>2.2' | 'CAI' | 'SBA';
  alpha_superior_tube: number;
  alpha_antibalzante: number;
  alpha_atirantado:number;
  wire_support_wire_to_tube_length:number;
  wire_support_end_distance:number;
  wire_support_to_eye_clamp_distance:number;
  eye_clamp_eye_to_tube_length:number;
  swivel_with_clevis_pole_to_pin_distance:number;
  swivel_with_clevis_pin_to_fix_connection_length:number;

  // Constructor to initialize the CantileverGerman properties.
  constructor(
    type: 'TDP<2.2' | 'TDP>2.2' | 'CAI' | 'SBA',
    contact_wire_height: number,
    system_height: number,
    zig_zag:number,
    upper_isolator_length:number,
    bottom_isolator_length:number,
    alpha_superior_tube:number,
    alpha_antibalzante:number,
    alpha_atirantado:number,
    bitola:number,
    esc:number,
    pv:number,
    wire_support_wire_to_tube_length:number,
    wire_support_end_distance:number,
    wire_support_to_eye_clamp_distance:number,
    eye_clamp_eye_to_tube_length:number,
    swivel_with_clevis_pole_to_pin_distance:number,
    swivel_with_clevis_pin_to_fix_connection_length:number
  ) {
    // Call the parent constructbior to initialize inherited properties.
    super(system_height,contact_wire_height, zig_zag, upper_isolator_length, bottom_isolator_length, bitola, esc, pv );
    this.type = type;
    this.alpha_superior_tube = alpha_superior_tube;
    this.alpha_antibalzante = alpha_antibalzante;
    this.alpha_atirantado = alpha_atirantado;
    this.wire_support_wire_to_tube_length = wire_support_wire_to_tube_length;
    this.wire_support_end_distance = wire_support_end_distance;
    this.wire_support_to_eye_clamp_distance = wire_support_to_eye_clamp_distance;
    this.eye_clamp_eye_to_tube_length = eye_clamp_eye_to_tube_length;
    this.swivel_with_clevis_pole_to_pin_distance = swivel_with_clevis_pole_to_pin_distance;
    this.swivel_with_clevis_pin_to_fix_connection_length = swivel_with_clevis_pin_to_fix_connection_length;
  }

  getWireSupportDistanceFromFixedPoint():number {
      return (this.getMwAxis().x - this.swivel_with_clevis_pole_to_pin_distance - this.swivel_with_clevis_pin_to_fix_connection_length)*(1/Math.cos(this.degreesToRadians(360 + this.alpha_superior_tube))) +  this.wire_support_wire_to_tube_length*(Math.tan(this.degreesToRadians(360 + this.alpha_superior_tube)));
  }

  getWireSupportFixedPoint():{x:number, y:number} {

    let x_axis = this.getWireSupportDistanceFromFixedPoint() * Math.cos(this.degreesToRadians(360 + this.alpha_superior_tube)) + this.swivel_with_clevis_pole_to_pin_distance + this.swivel_with_clevis_pin_to_fix_connection_length; 
    let y_axis =  this.getMwAxis().y - (1/Math.cos(this.degreesToRadians(360 + this.alpha_superior_tube)))*this.wire_support_wire_to_tube_length;

    return { x: x_axis, y:y_axis  }
  }

  getUpperTubeEndPoint():{x:number, y:number}{
    let x_axis =  this.getWireSupportFixedPoint().x + this.wire_support_end_distance* Math.cos(this.degreesToRadians(360 + this.alpha_superior_tube));

    let y_axis =  this.getWireSupportFixedPoint().y + this.wire_support_end_distance* Math.sin(this.degreesToRadians(360 + this.alpha_superior_tube));

    return { x: x_axis, y:y_axis  }
  }

  getUpperTubeEyeClampTubeFixedPoint():{x:number,y:number}{
    let x_axis =  this.getWireSupportFixedPoint().x - this.wire_support_to_eye_clamp_distance* Math.cos(this.degreesToRadians(360 + this.alpha_superior_tube));

    let y_axis =  this.getWireSupportFixedPoint().y - this.wire_support_to_eye_clamp_distance* Math.sin(this.degreesToRadians(360 + this.alpha_superior_tube));

    return { x: x_axis, y:y_axis  }
  }

  getUpperFixedPoint():{x:number,y:number}{
    let x_axis =  this.getWireSupportFixedPoint().x - this.getWireSupportDistanceFromFixedPoint() * Math.cos(this.degreesToRadians(360 + this.alpha_superior_tube));

    let y_axis =  this.getWireSupportFixedPoint().y - this.getWireSupportDistanceFromFixedPoint() * Math.sin(this.degreesToRadians(360 + this.alpha_superior_tube));

    return { x: x_axis, y:y_axis  }
  }

  getUpperIsolatorPoint():{x:number, y:number}{
    let x_axis =  this.getUpperFixedPoint().x + this.upper_isolator_length * Math.cos(this.degreesToRadians(360 + this.alpha_superior_tube));

    let y_axis =  this.getUpperFixedPoint().y + this.upper_isolator_length * Math.sin(this.degreesToRadians(360 + this.alpha_superior_tube));
    return { x: x_axis, y:y_axis  }

  }

  getUpperPoleFixedPoint():{x:number,y:number}{
    let x_axis =  this.getUpperFixedPoint().x - this.swivel_with_clevis_pole_to_pin_distance - this.swivel_with_clevis_pin_to_fix_connection_length;

    let y_axis =  this.getUpperFixedPoint().y;

    return { x: x_axis, y:y_axis  }
  }

  getUpperTubeEyeClampFixedPoint():{x:number, y:number}{
    let x_axis =  this.getUpperTubeEyeClampTubeFixedPoint().x + this.eye_clamp_eye_to_tube_length * Math.sin(this.degreesToRadians(360 + this.alpha_superior_tube));

    let y_axis =  this.getUpperTubeEyeClampTubeFixedPoint().y - this.eye_clamp_eye_to_tube_length * Math.cos(this.degreesToRadians(360 + this.alpha_superior_tube)); 

    return { x: x_axis, y:y_axis  }
  }

  generateLinks():{x1:number,y1:number, x2:number,y2:number, dimension_line:boolean}[]{

    let links:{x1:number,y1:number, x2:number,y2:number, dimension_line:boolean}[] = [];

    links.push({  x1: 0, y1:this.esc ,  x2: 0, y2:6500, dimension_line:false });

    //upper links
    links.push({  x1: this.getUpperPoleFixedPoint().x, y1:this.getUpperPoleFixedPoint().y, x2:this.getUpperFixedPoint().x, y2:this.getUpperFixedPoint().y,  dimension_line:false });

    links.push({  x1:this.getUpperFixedPoint().x, y1:this.getUpperFixedPoint().y, x2: this.getUpperIsolatorPoint().x, y2:this.getUpperIsolatorPoint().y, dimension_line:true });

    links.push({  x1:this.getUpperIsolatorPoint().x, y1:this.getUpperIsolatorPoint().y, x2: this.getUpperTubeEyeClampTubeFixedPoint().x, y2:this.getUpperTubeEyeClampTubeFixedPoint().y, dimension_line:true });


    links.push({  x1: this.getUpperTubeEyeClampTubeFixedPoint().x, y1:this.getUpperTubeEyeClampTubeFixedPoint().y ,  x2: this.getWireSupportFixedPoint().x, y2:this.getWireSupportFixedPoint().y, dimension_line:true });

    links.push({  x1: this.getUpperTubeEyeClampTubeFixedPoint().x, y1:this.getUpperTubeEyeClampTubeFixedPoint().y ,  x2: this.getUpperTubeEyeClampFixedPoint().x, y2:this.getUpperTubeEyeClampFixedPoint().y, dimension_line:true });

    links.push({  x1: this.getWireSupportFixedPoint().x, y1:this.getWireSupportFixedPoint().y ,  x2: this.getUpperTubeEndPoint().x, y2:this.getUpperTubeEndPoint().y, dimension_line:true });

    links.push({  x1: this.getWireSupportFixedPoint().x, y1:this.getWireSupportFixedPoint().y ,  x2: this.getMwAxis().x, y2:this.getMwAxis().y, dimension_line:true });

    return links;
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
      parsedData.upper_isolator_length,
      parsedData.bottom_isolator_length,
      parsedData.bitola,
      parsedData.esc,
      parsedData.pv,
      parsedData.type,
      parsedData.alpha_superior_tube,
      parsedData.alpha_antibalzante,
      parsedData.alpha_atirantado,
      parsedData.wire_support_wire_to_tube_length,
      parsedData.wire_support_end_distance,
      parsedData.wire_support_to_eye_clamp_distance,
      parsedData.eye_clamp_eye_to_tube_length,
      parsedData.swivel_with_clevis_pole_to_pin_distance,
      parsedData.swivel_with_clevis_pin_to_fix_connection_length
    );
  }
}

export default CantileverGerman;
