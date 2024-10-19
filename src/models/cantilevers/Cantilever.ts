
class Cantilever {
  // Properties common to all cantilevers.
  contact_wire_height: number;
  system_height:number;
  zig_zag:number;
  bitola:number;
  esc:number;
  pv:number;

  // Constructor to initialize the properties.
  constructor(
    system_height:number,
    contact_wire_height: number,
    zig_zag:number,
    bitola:number,
    esc:number,
    pv:number

  ) {
    this.system_height = system_height;
    this.contact_wire_height = contact_wire_height;
    this.zig_zag = zig_zag;
    this.bitola = bitola;
    this.esc = esc;
    this.pv = pv;
  }

  degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  radiansToDegress(radians:number): number{
    return radians * (180/Math.PI);
  }

  getDistanceBetweenTwoPoints(point1:{x:number,y:number},point2:{x:number,y:number}):number{
    return  Math.sqrt(Math.pow((point2.y - point1.y), 2) + Math.pow((point2.x - point1.x),2))  ; 
  }

  getAngleBetweenTwoPoints(point1:{x:number,y:number},point2:{x:number,y:number}):number {

    return this.radiansToDegress(Math.atan((point2.y - point1.y)/(point2.x - point1.x)));
  }
  
  getBitolaAngle(): number {
    // Ensure the ratio is between -1 and 1 to avoid errors in acos calculation
    //const ratio = this.esc / this.bitola;
    // Calculate the angle in radians and return it
    //return Math.acos(ratio);
    return this.degreesToRadians(2);
  }


  getViaAxis():{x:number, y:number, z:number}{
    let x_axis = 0;
    let y_axis = 0;

    if(this.getBitolaAngle() <= 180){
      x_axis =  this.pv - this.contact_wire_height*Math.sin(this.getBitolaAngle());
      y_axis = this.contact_wire_height*Math.cos(this.getBitolaAngle())
    }else{
      x_axis =  this.pv + this.contact_wire_height*Math.sin(this.getBitolaAngle());
      y_axis =  this.contact_wire_height*Math.cos(this.getBitolaAngle())
    }

    return { x: x_axis, y:y_axis, z:0}
  }

  getCwAxis():{x:number, y:number, z:number}{

    let x_axis = 0;
    let y_axis = 0;

    if(this.getBitolaAngle() <= 180){
      x_axis = this.getViaAxis().x+this.zig_zag*(Math.cos(this.getBitolaAngle()));
      y_axis = this.getViaAxis().y+this.zig_zag*(Math.sin(this.getBitolaAngle()));

    }else{
      x_axis = this.getViaAxis().x+this.zig_zag*(Math.cos(this.getBitolaAngle()));
      y_axis = this.getViaAxis().y-this.zig_zag*(Math.sin(this.getBitolaAngle()));
    }

    return { x: x_axis, y:y_axis, z:0  }
  }

  getIsolatorUtilLength(isolator:Isolator):number{
    return isolator.eye_length - isolator.tube_length
  }

  getClevisEndFittingUtilLength(clevisEndFitting:ClevisEndFitting):number {
    return clevisEndFitting.L - clevisEndFitting.a;
  }

  getSwivelClevisUtilLength(swivel_bracket:SwivelBracket, swivel_clevis:SwivelClevis){
    return swivel_bracket.x_pin + swivel_clevis.pin_eye;

  }

  getMwAxis():{x:number,y:number, z:number}{
    let x_axis = this.getCwAxis().x;
    let y_axis = this.getCwAxis().y + this.system_height;
    return { x: x_axis, y:y_axis, z:0  }

  }

  getMarginViewer():{left:number, right:number, top:number, bottom:number}{
    return {
      left: -1000,
      right:this.getCwAxis().x + 1000,
      bottom: this.getCwAxis().y - 500,
      top:this.getMwAxis().y + 500
    }
  }

  roundToDecimals(value:number, qtyDecimals:number):number{
    const decimals = Math.pow(10, qtyDecimals);
    const rounded = Math.round(value * decimals) / decimals; 
    return  rounded;
  }

}



export { Cantilever };
