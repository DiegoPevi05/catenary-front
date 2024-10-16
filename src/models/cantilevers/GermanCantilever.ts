import { Cantilever } from "./Cantilever";

// Define a subclass CantileverGerman, inheriting from Cantilever.
class CantileverGerman extends Cantilever {
  // Additional property specific to CantileverGerman.
  type:'TDP<2.2' | 'TDP>2.2' | 'CAI' | 'SBA';
  stay_tube:{
    alpha:number;
    tube:SteelTube;
    isolator:Isolator;
    mw_support:{
      wireSupport:WireSupport,
      end_distance:number;
      eye_clamp_distance:number;
    };
    eye_clamp:EyeClamp;
    swivel_bracket:SwivelBracket;
    swivel_clevis:SwivelClevis  
  };
  bracket_tube:{
    tube:SteelTube;
    isolator:Isolator;
    swivel_bracket:SwivelBracket;
    swivel_clevis:SwivelClevis;
    clevis_end_fitting:ClevisEndFitting;
  };
  register_arm:{
    alpha:number;
    tube:SteelTube;
  } | null;
  steady_arm:{
    alpha:number;
    end_distance:number;
    tube:SteelTube;
    eye_clamp:EyeClamp;
    hook_end_fitting:HookEndFitting;
    swivel_clip:SwivelClip;
  };

  // Constructor to initialize the CantileverGerman properties.
  constructor(
    type: 'TDP<2.2' | 'TDP>2.2' | 'CAI' | 'SBA',
    contact_wire_height: number,
    system_height: number,
    zig_zag:number,
    bitola:number,
    esc:number,
    pv:number,
    stay_tube:{
      alpha:number;
      tube:SteelTube;
      isolator:Isolator;
      mw_support:{
        wireSupport:WireSupport,
        end_distance:number;
        eye_clamp_distance:number;
      };
      eye_clamp:EyeClamp;
      swivel_bracket:SwivelBracket;
      swivel_clevis:SwivelClevis  
    },
    bracket_tube:{
      tube:SteelTube;
      isolator:Isolator;
      swivel_bracket:SwivelBracket;
      swivel_clevis:SwivelClevis;
      clevis_end_fitting:ClevisEndFitting;
    },
    register_arm:{
      alpha:number;
      tube:SteelTube;
    } | null,
    steady_arm:{
      alpha:number;
      end_distance:number;
      tube:SteelTube;
      eye_clamp:EyeClamp;
      hook_end_fitting:HookEndFitting;
      swivel_clip:SwivelClip;
    }
  ) {
    // Call the parent constructbior to initialize inherited properties.
    super(system_height,contact_wire_height, zig_zag, bitola, esc, pv );
    this.type = type;
    this.stay_tube = stay_tube;
    this.bracket_tube = bracket_tube;
    this.register_arm = register_arm;
    this.steady_arm = steady_arm;
  }

  //getWireSupportDistanceFromFixedPoint
  getWireSupportDistanceFromFixedPoint():number {
    let dx = this.getMwAxis().x - this.getSwivelClevisUtilLength(this.stay_tube.swivel_bracket,this.stay_tube.swivel_clevis);
      return (dx)*(1/Math.cos(this.degreesToRadians(360 + this.stay_tube.alpha))) +  this.stay_tube.mw_support.wireSupport.h*(Math.tan(this.degreesToRadians(360 + this.stay_tube.alpha)));
  }

  getWireSupportFixedPoint():{x:number, y:number} {
    let x_axis = this.getWireSupportDistanceFromFixedPoint() * Math.cos(this.degreesToRadians(360 + this.stay_tube.alpha)) + this.getSwivelClevisUtilLength(this.stay_tube.swivel_bracket,this.stay_tube.swivel_clevis); 

    let y_axis =  this.getMwAxis().y - (1/Math.cos(this.degreesToRadians(360 + this.stay_tube.alpha)))*this.stay_tube.mw_support.wireSupport.h;

    return { x: x_axis, y:y_axis  }
  }

  getUpperTubeEndPoint():{x:number, y:number}{
    let x_axis =  this.getWireSupportFixedPoint().x + this.stay_tube.mw_support.end_distance* Math.cos(this.degreesToRadians(360 + this.stay_tube.alpha));

    let y_axis =  this.getWireSupportFixedPoint().y + this.stay_tube.mw_support.end_distance* Math.sin(this.degreesToRadians(360 + this.stay_tube.alpha));

    return { x: x_axis, y:y_axis  }
  }

  getUpperTubeEyeClampTubeFixedPoint():{x:number,y:number}{
    let x_axis =  this.getWireSupportFixedPoint().x - this.stay_tube.mw_support.eye_clamp_distance* Math.cos(this.degreesToRadians(360 + this.stay_tube.alpha));

    let y_axis =  this.getWireSupportFixedPoint().y - this.stay_tube.mw_support.eye_clamp_distance* Math.sin(this.degreesToRadians(360 + this.stay_tube.alpha));

    return { x: x_axis, y:y_axis  }
  }

  getUpperFixedPoint():{x:number,y:number}{
    let x_axis =  this.getWireSupportFixedPoint().x - this.getWireSupportDistanceFromFixedPoint() * Math.cos(this.degreesToRadians(360 + this.stay_tube.alpha));

    let y_axis =  this.getWireSupportFixedPoint().y - this.getWireSupportDistanceFromFixedPoint() * Math.sin(this.degreesToRadians(360 + this.stay_tube.alpha));

    return { x: x_axis, y:y_axis  }
  }

  getUpperIsolatorPoint():{x:number, y:number}{
    let x_axis =  this.getUpperFixedPoint().x + this.getIsolatorUtilLength(this.stay_tube.isolator) * Math.cos(this.degreesToRadians(360 + this.stay_tube.alpha));

    let y_axis =  this.getUpperFixedPoint().y + this.getIsolatorUtilLength(this.stay_tube.isolator) * Math.sin(this.degreesToRadians(360 + this.stay_tube.alpha));
    return { x: x_axis, y:y_axis  }

  }

  getUpperPoleFixedPoint():{x:number,y:number}{
    let x_axis =  this.getUpperFixedPoint().x - this.stay_tube.swivel_clevis.pin_eye - this.stay_tube.swivel_bracket.x_pin;

    let y_axis =  this.getUpperFixedPoint().y;

    return { x: x_axis, y:y_axis  }
  }

  getUpperTubeEyeClampFixedPoint():{x:number, y:number}{
    let x_axis =  this.getUpperTubeEyeClampTubeFixedPoint().x + this.stay_tube.eye_clamp.h * Math.sin(this.degreesToRadians(360 + this.stay_tube.alpha));

    let y_axis =  this.getUpperTubeEyeClampTubeFixedPoint().y - this.stay_tube.eye_clamp.h * Math.cos(this.degreesToRadians(360 + this.stay_tube.alpha)); 

    return { x: x_axis, y:y_axis  }
  }

  //TODO to ask dalton
  getBottomPoleFixedPoint():{x:number,y:number}{
    let x_axis =  this.getUpperPoleFixedPoint().x;

    let y_axis =  this.getUpperPoleFixedPoint().y - Math.tan(this.degreesToRadians(360 + this.stay_tube.alpha))*this.getMwAxis().x  - this.system_height - 50;

    return { x: x_axis, y:y_axis  }
  }

  getBottomFixedPoint():{x:number,y:number}{
    let x_axis =  this.getBottomPoleFixedPoint().x + this.bracket_tube.swivel_clevis.pin_eye + this.bracket_tube.swivel_bracket.x_pin;

    let y_axis =  this.getBottomPoleFixedPoint().y;

    return { x: x_axis, y:y_axis  }
  }


  getInferiorTubeAngle() {
    let dx = this.getUpperTubeEyeClampFixedPoint().x - this.getBottomFixedPoint().x;
    let dy = this.getUpperTubeEyeClampFixedPoint().y - this.getBottomFixedPoint().y;

    let angle = Math.atan2(dy, dx); 

    return { angle };
  }

  getBottomIsolatorPoint(){

    let x_axis =  this.getBottomFixedPoint().x + this.getIsolatorUtilLength(this.bracket_tube.isolator) * Math.cos(this.getInferiorTubeAngle().angle);

    let y_axis =  this.getBottomFixedPoint().y + this.getIsolatorUtilLength(this.bracket_tube.isolator) * Math.sin(this.getInferiorTubeAngle().angle); 

    return { x: x_axis, y:y_axis  }
  }

  getUpperEyeClampClevisFixedPoint():{x:number, y:number}{

    let x_axis =  this.getUpperTubeEyeClampFixedPoint().x - this.getClevisEndFittingUtilLength(this.bracket_tube.clevis_end_fitting) * Math.cos(this.getInferiorTubeAngle().angle);

    let y_axis =  this.getUpperTubeEyeClampFixedPoint().y - this.getClevisEndFittingUtilLength(this.bracket_tube.clevis_end_fitting) * Math.sin(this.getInferiorTubeAngle().angle); 

    return { x: x_axis, y:y_axis  }
  }

  getSteadyArmFixedPoint():{x:number, y:number}{

    let angleModified = (this.steady_arm.swivel_clip.cw_angle) + (360 + this.steady_arm.alpha);

    let x_axis =  this.getCwAxis().x + this.steady_arm.swivel_clip.cw_height * Math.cos(this.degreesToRadians(angleModified));

    let y_axis =  this.getCwAxis().y + this.steady_arm.swivel_clip.cw_height * Math.sin(this.degreesToRadians(angleModified)); 

    return { x: x_axis, y:y_axis  }
  }

  getSteadyArmEndPoint():{x:number, y:number}{

    let x_axis =  this.getSteadyArmFixedPoint().x + this.steady_arm.end_distance * Math.cos(this.degreesToRadians(360 + this.steady_arm.alpha));

    let y_axis =  this.getSteadyArmFixedPoint().y + this.steady_arm.end_distance * Math.sin(this.degreesToRadians(360 + this.steady_arm.alpha)); 

    return { x: x_axis, y:y_axis  }
  }

  getIntersectionPoint():{x:number, y:number}{

    let length_bottom_arc = this.getDistanceBetweenTwoPoints(this.getBottomFixedPoint(),this.getSteadyArmFixedPoint());      

    let inferior_tube_angle =  this.getAngleBetweenTwoPoints(this.getBottomFixedPoint(), this.getUpperTubeEyeClampFixedPoint());

    let bottom_left_angle =  inferior_tube_angle - this.getAngleBetweenTwoPoints(this.getBottomFixedPoint(),this.getSteadyArmFixedPoint())

    let upper_angle = 180 - this.getAngleBetweenTwoPoints(this.getBottomFixedPoint(), this.getUpperTubeEyeClampFixedPoint()) - this.steady_arm.alpha;

    let right_angle = 180  - upper_angle - bottom_left_angle;

    //length_bottom_arc/sin(top-angle) = length_right_arc/sin(bottom-left-angle) =  length_left_arc/sin(bottom-right-angle)
    let length_left_arc = Math.sin(this.degreesToRadians(right_angle))*(length_bottom_arc/Math.sin(this.degreesToRadians(upper_angle)));

    let x_axis =  this.getBottomFixedPoint().x + length_left_arc * Math.cos(this.degreesToRadians(360 + inferior_tube_angle));

    let y_axis =  this.getBottomFixedPoint().y + length_left_arc * Math.sin(this.degreesToRadians(360 + inferior_tube_angle)); 

    return { x: x_axis, y:y_axis  }
  }

  getIntersectionTubeFixedPoint():{x:number,y:number}{

    let bottom_left_angle = this.getAngleBetweenTwoPoints(this.getBottomFixedPoint(), this.getUpperTubeEyeClampFixedPoint());

    let internal_angle = bottom_left_angle + this.steady_arm.alpha;

    let length_fixed_point = this.steady_arm.eye_clamp.h/Math.tan(this.radiansToDegress(internal_angle))

    let x_axis =  this.getIntersectionPoint().x + length_fixed_point * Math.cos(this.degreesToRadians(360 + bottom_left_angle));

    let y_axis =  this.getIntersectionPoint().y + length_fixed_point * Math.sin(this.degreesToRadians(360 + bottom_left_angle)); 

    return { x: x_axis, y:y_axis  }
  }
  
  getIntersectionSteadyArmFixedPoint():{x:number,y:number}{
    let bottom_left_angle = this.getAngleBetweenTwoPoints(this.getBottomFixedPoint(), this.getUpperTubeEyeClampFixedPoint());

    let internal_angle = bottom_left_angle + this.steady_arm.alpha;

    let length_fixed_point = this.steady_arm.eye_clamp.h/Math.sin(this.radiansToDegress(internal_angle))

    let x_axis =  this.getIntersectionPoint().x + length_fixed_point * Math.cos(this.degreesToRadians(360 + this.steady_arm.alpha));

    let y_axis =  this.getIntersectionPoint().y + length_fixed_point * Math.sin(this.degreesToRadians(360 + this.steady_arm.alpha)); 

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

    //bottom links
    links.push({  x1: this.getBottomPoleFixedPoint().x, y1:this.getBottomPoleFixedPoint().y ,  x2: this.getBottomFixedPoint().x, y2:this.getBottomFixedPoint().y, dimension_line:true });

    links.push({  x1: this.getUpperEyeClampClevisFixedPoint().x, y1:this.getUpperEyeClampClevisFixedPoint().y ,  x2: this.getUpperTubeEyeClampFixedPoint().x, y2:this.getUpperTubeEyeClampFixedPoint().y, dimension_line:false });

    links.push({  x1: this.getBottomFixedPoint().x, y1:this.getBottomFixedPoint().y ,  x2: this.getBottomIsolatorPoint().x, y2:this.getBottomIsolatorPoint().y, dimension_line:false });


    links.push({  x1: this.getBottomIsolatorPoint().x, y1:this.getBottomIsolatorPoint().y ,  x2: this.getUpperEyeClampClevisFixedPoint().x, y2:this.getUpperEyeClampClevisFixedPoint().y, dimension_line:true });
    
    //steady arm
    links.push({  x1: this.getSteadyArmFixedPoint().x, y1:this.getSteadyArmFixedPoint().y ,  x2: this.getCwAxis().x, y2:this.getCwAxis().y, dimension_line:true });

    links.push({  x1: this.getSteadyArmFixedPoint().x, y1:this.getSteadyArmFixedPoint().y ,  x2: this.getSteadyArmEndPoint().x, y2:this.getSteadyArmEndPoint().y, dimension_line:true });

    links.push({  x1: this.getSteadyArmFixedPoint().x, y1:this.getSteadyArmFixedPoint().y ,  x2: this.getIntersectionTubeFixedPoint().x, y2:this.getIntersectionTubeFixedPoint().y, dimension_line:true });

    links.push({  x1: this.getIntersectionTubeFixedPoint().x, y1:this.getIntersectionTubeFixedPoint().y ,  x2: this.getIntersectionSteadyArmFixedPoint().x, y2:this.getIntersectionSteadyArmFixedPoint().y, dimension_line:true });

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
  static deserialize(data: CantileverGermanParams): CantileverGerman {
    return new CantileverGerman(
      data.type,
      data.contact_wire_height,
      data.system_height,
      data.zig_zag,
      data.bitola,
      data.esc,
      data.pv,
      data.stay_tube,
      data.bracket_tube,
      data.register_arm,
      data.steady_arm
    );
  }
}

export default CantileverGerman;
