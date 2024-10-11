class Cantilever {
  // Properties common to all cantilevers.
  contact_wire_height: number;
  system_height:number;
  zig_zag:number;
  upper_isolator_length:number;
  bottom_isolator_length:number;
  bitola:number;
  esc:number;
  pv:number;

  // Constructor to initialize the properties.
  constructor(
    system_height:number,
    contact_wire_height: number,
    zig_zag:number,
    upper_isolator_length:number,
    bottom_isolator_length:number,
    bitola:number,
    esc:number,
    pv:number

  ) {
    this.system_height = system_height;
    this.contact_wire_height = contact_wire_height;
    this.zig_zag = zig_zag;
    this.upper_isolator_length = upper_isolator_length;
    this.bottom_isolator_length = bottom_isolator_length;
    this.bitola = bitola;
    this.esc = esc;
    this.pv = pv;
  }

  degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
  
  getBitolaAngle(): number {
    // Ensure the ratio is between -1 and 1 to avoid errors in acos calculation
    //const ratio = this.esc / this.bitola;
    // Calculate the angle in radians and return it
    //return Math.acos(ratio);
    return this.degreesToRadians(2);
  }


  getViaAxis():{x:number, y:number}{
    let x_axis = 0;
    let y_axis = 0;

    if(this.getBitolaAngle() <= 180){
      x_axis =  this.pv - this.contact_wire_height*Math.sin(this.getBitolaAngle());
      y_axis = this.contact_wire_height*Math.cos(this.getBitolaAngle())
    }else{
      x_axis =  this.pv + this.contact_wire_height*Math.sin(this.getBitolaAngle());
      y_axis =  this.contact_wire_height*Math.cos(this.getBitolaAngle())
    }

    return { x: x_axis, y:y_axis  }
  }

  getCwAxis():{x:number, y:number}{

    let x_axis = 0;
    let y_axis = 0;

    if(this.getBitolaAngle() <= 180){
      x_axis = this.getViaAxis().x+this.zig_zag*(Math.cos(this.getBitolaAngle()));
      y_axis = this.getViaAxis().y+this.zig_zag*(Math.sin(this.getBitolaAngle()));

    }else{
      x_axis = this.getViaAxis().x+this.zig_zag*(Math.cos(this.getBitolaAngle()));
      y_axis = this.getViaAxis().y-this.zig_zag*(Math.sin(this.getBitolaAngle()));
    }

    return { x: x_axis, y:y_axis  }
  }

  getMwAxis():{x:number,y:number}{
    let x_axis = this.getCwAxis().x;
    let y_axis = this.getCwAxis().y + this.system_height;
    return { x: x_axis, y:y_axis  }

  }


}



export { Cantilever };
