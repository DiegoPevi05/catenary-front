class Cantilever {
  // Properties common to all cantilevers.
  contact_wire_height: number;
  system_height:number;
  zig_zag:number;
  isolator_length_1:number;
  isolator_length_2:number;
  bitola:number;
  esc:number;
  pv:number;

  // Constructor to initialize the properties.
  constructor(
    system_height:number,
    contact_wire_height: number,
    zig_zag:number,
    isolator_length_1:number,
    isolator_length_2:number,
    bitola:number,
    esc:number,
    pv:number

  ) {
    this.system_height = system_height;
    this.contact_wire_height = contact_wire_height;
    this.zig_zag = zig_zag;
    this.isolator_length_1 = isolator_length_1;
    this.isolator_length_2 = isolator_length_2;
    this.bitola = bitola;
    this.esc = esc;
    this.pv = pv;
  }
  
  getBitolaAngle(): number {
    // Ensure the ratio is between -1 and 1 to avoid errors in acos calculation
    const ratio = this.bitola / this.esc;
    if (ratio < -1 || ratio > 1) {
      return 0;
    }
    // Calculate the angle in radians and return it
    return Math.acos(ratio);
  }

  getViaAxis():{x:number, y:number}{
    let x_axis = this.contact_wire_height*Math.cos(this.getBitolaAngle()) + this.pv;
    let y_axis = this.contact_wire_height*Math.sin(this.getBitolaAngle());
    return { x: x_axis, y:y_axis  }
  }

  getCwAxis():{x:number, y:number}{
    let x_axis = this.getViaAxis().x+this.zig_zag*(Math.cos(Math.PI/2 - this.getBitolaAngle()));
    let y_axis = this.getViaAxis().y-this.zig_zag*(Math.sin(Math.PI/2 - this.getBitolaAngle()));
    return { x: x_axis, y:y_axis  }
  }

  getMwAxis():{x:number,y:number}{
    let x_axis = this.getCwAxis().x;
    let y_axis = this.getMwAxis().y + this.system_height;
    return { x: x_axis, y:y_axis  }

  }


}



export { Cantilever };
