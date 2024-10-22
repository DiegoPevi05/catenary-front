import { Cantilever } from "./Cantilever";

// Define a subclass CantileverGerman, inheriting from Cantilever.
class CantileverGerman extends Cantilever {
  // Additional property specific to CantileverGerman.
  model:ModelInterface;
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
    eye_clamp:EyeClamp;
  };
  register_arm:{
    alpha:number;
    tube:SteelTube;
  } | null;
  steady_arm:{
    alpha:number;
    end_distance:number;
    tube:SteelTube;
    hook_end_fitting:HookEndFitting;
    swivel_clip:SwivelClip;
  };

  // Constructor to initialize the CantileverGerman properties.
  constructor(
    model: ModelInterface,
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
      eye_clamp:EyeClamp;
    },
    register_arm:{
      alpha:number;
      tube:SteelTube;
    } | null,
    steady_arm:{
      alpha:number;
      end_distance:number;
      tube:SteelTube;
      hook_end_fitting:HookEndFitting;
      swivel_clip:SwivelClip;
    }
  ) {
    // Call the parent constructbior to initialize inherited properties.
    super(system_height,contact_wire_height, zig_zag, bitola, esc, pv );
    this.model = model;
    this.stay_tube = stay_tube;
    this.bracket_tube = bracket_tube;
    this.register_arm = register_arm;
    this.steady_arm = steady_arm;
  }

  /***************************************************************************************************************************************************/
  /***************************************************************************************************************************************************/
  /***************************************************************************************************************************************************/
  /*********************************************************STAY STUBE***********************************************************************/
  /***************************************************************************************************************************************************/
  /***************************************************************************************************************************************************/


  //getWireSupportDistanceFromFixedPoint
  getWireSupportDistanceFromFixedPoint():number {
      let dx = this.getMwAxis().x - this.getSwivelClevisUtilLength(this.stay_tube.swivel_bracket,this.stay_tube.swivel_clevis);
      return (dx)*(1/Math.cos(this.degreesToRadians(360 + this.stay_tube.alpha))) +  this.stay_tube.mw_support.wireSupport.h*(Math.tan(this.degreesToRadians(360 + this.stay_tube.alpha)));
  }

  getWireSupportFixedPoint():{x:number, y:number, z:number} {
    let x_axis = this.getWireSupportDistanceFromFixedPoint() * Math.cos(this.degreesToRadians(360 + this.stay_tube.alpha)) + this.getSwivelClevisUtilLength(this.stay_tube.swivel_bracket,this.stay_tube.swivel_clevis); 

    let y_axis =  this.getMwAxis().y - (1/Math.cos(this.degreesToRadians(360 + this.stay_tube.alpha)))*this.stay_tube.mw_support.wireSupport.h;

    return { x: x_axis, y:y_axis ,z :0}
  }

  getUpperTubeEndPoint():{x:number, y:number, z:number}{
    let x_axis =  this.getWireSupportFixedPoint().x + this.stay_tube.mw_support.end_distance* Math.cos(this.degreesToRadians(360 + this.stay_tube.alpha));

    let y_axis =  this.getWireSupportFixedPoint().y + this.stay_tube.mw_support.end_distance* Math.sin(this.degreesToRadians(360 + this.stay_tube.alpha));

    return { x: x_axis, y:y_axis, z:0  }
  }

  getUpperTubeEyeClampTubeFixedPoint():{x:number,y:number, z:number}{
    let x_axis =  this.getWireSupportFixedPoint().x - this.stay_tube.mw_support.eye_clamp_distance* Math.cos(this.degreesToRadians(360 + this.stay_tube.alpha));

    let y_axis =  this.getWireSupportFixedPoint().y - this.stay_tube.mw_support.eye_clamp_distance* Math.sin(this.degreesToRadians(360 + this.stay_tube.alpha));

    return { x: x_axis, y:y_axis , z:0}
  }

  getUpperFixedPoint():{x:number,y:number, z:number}{
    let x_axis =  this.getWireSupportFixedPoint().x - this.getWireSupportDistanceFromFixedPoint() * Math.cos(this.degreesToRadians(360 + this.stay_tube.alpha));

    let y_axis =  this.getWireSupportFixedPoint().y - this.getWireSupportDistanceFromFixedPoint() * Math.sin(this.degreesToRadians(360 + this.stay_tube.alpha));

    return { x: x_axis, y:y_axis , z:0  }
  }

  getUpperIsolatorPoint():{x:number, y:number, z:number}{
    let x_axis =  this.getUpperFixedPoint().x + this.getIsolatorUtilLength(this.stay_tube.isolator) * Math.cos(this.degreesToRadians(360 + this.stay_tube.alpha));

    let y_axis =  this.getUpperFixedPoint().y + this.getIsolatorUtilLength(this.stay_tube.isolator) * Math.sin(this.degreesToRadians(360 + this.stay_tube.alpha));
    return { x: x_axis, y:y_axis, z:0  }

  }

  getUpperPoleFixedPoint():{x:number,y:number, z:number}{
    let x_axis =  this.getUpperFixedPoint().x - this.stay_tube.swivel_clevis.pin_eye - this.stay_tube.swivel_bracket.x_pin;

    let y_axis =  this.getUpperFixedPoint().y;

    return { x: x_axis, y:y_axis , z:0  }
  }

  getUpperTubeEyeClampFixedPoint():{x:number, y:number, z:number}{
    let x_axis =  this.getUpperTubeEyeClampTubeFixedPoint().x + this.stay_tube.eye_clamp.h * Math.sin(this.degreesToRadians(360 + this.stay_tube.alpha));

    let y_axis =  this.getUpperTubeEyeClampTubeFixedPoint().y - this.stay_tube.eye_clamp.h * Math.cos(this.degreesToRadians(360 + this.stay_tube.alpha)); 

    return { x: x_axis, y:y_axis, z:0 }
  }

  /***************************************************************************************************************************************************/
  /***************************************************************************************************************************************************/
  /***************************************************************************************************************************************************/
  /*********************************************************END STAY TUBE***********************************************************************/
  /***************************************************************************************************************************************************/
  /***************************************************************************************************************************************************/


  /***************************************************************************************************************************************************/
  /***************************************************************************************************************************************************/
  /***************************************************************************************************************************************************/
  /*********************************************************START BRACKET TUBE***********************************************************************/
  /***************************************************************************************************************************************************/
  /***************************************************************************************************************************************************/

  //TODO to ask dalton
  getBottomPoleFixedPoint():{x:number,y:number, z:number}{
    let x_axis =  this.getUpperPoleFixedPoint().x;

    let y_axis =  this.getUpperPoleFixedPoint().y - Math.tan(this.degreesToRadians(360 + this.stay_tube.alpha))*this.getMwAxis().x  - this.system_height - 50;

    return { x: x_axis, y:y_axis, z:0  }
  }

  getBottomFixedPoint():{x:number,y:number, z:number}{
    let x_axis =  this.getBottomPoleFixedPoint().x + this.bracket_tube.swivel_clevis.pin_eye + this.bracket_tube.swivel_bracket.x_pin;

    let y_axis =  this.getBottomPoleFixedPoint().y;

    return { x: x_axis, y:y_axis, z:0  }
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

  getUpperEyeClampClevisFixedPoint():{x:number, y:number, z:number}{

    let x_axis =  this.getUpperTubeEyeClampFixedPoint().x - this.getClevisEndFittingUtilLength(this.bracket_tube.clevis_end_fitting) * Math.cos(this.getInferiorTubeAngle().angle);

    let y_axis =  this.getUpperTubeEyeClampFixedPoint().y - this.getClevisEndFittingUtilLength(this.bracket_tube.clevis_end_fitting) * Math.sin(this.getInferiorTubeAngle().angle); 

    return { x: x_axis, y:y_axis, z:0  }
  }

  /***************************************************************************************************************************************************/
  /***************************************************************************************************************************************************/
  /***************************************************************************************************************************************************/
  /*********************************************************END BRACKET TUBE***********************************************************************/
  /***************************************************************************************************************************************************/
  /***************************************************************************************************************************************************/

  /***************************************************************************************************************************************************/
  /***************************************************************************************************************************************************/
  /***************************************************************************************************************************************************/
  /*********************************************************STARY STEADY ARM**************************************************************************/
  /***************************************************************************************************************************************************/
  /***************************************************************************************************************************************************/


  /***********************************************************TDP<2.2 - SINGLE**********************************************************************************/
  getIntersectionTubeFixedPoint():{x:number,y:number, z:number}{

    let length_1 = this.getDistanceBetweenTwoPoints(this.getIntersectionPoint(), this.getBottomFixedPoint());
    let length_2 = this.getDistanceBetweenTwoPoints(this.getIntersectionPoint(), this.getSteadyArmEndPoint());

    let angle_bracket_tube = this.getAngleBetweenTwoPoints(this.getBottomFixedPoint(), this.getUpperTubeEyeClampFixedPoint());
    let angle_steady_arm_bottom_fixed_point = this.getAngleBetweenTwoPoints(this.getBottomFixedPoint(), this.getSteadyArmFixedPoint());

    let theta2 = angle_bracket_tube - angle_steady_arm_bottom_fixed_point;
    let theta1 =  Math.asin((length_1*Math.sin(this.degreesToRadians(theta2)))/(length_2))
    let theta3 = 180 - (theta2 + this.radiansToDegress(theta1));

    let CA = this.bracket_tube.eye_clamp.h*Math.cos(this.degreesToRadians(180-theta3))/Math.sin(this.degreesToRadians(180-theta3));

    let x_axis = Math.abs(CA*Math.cos(this.degreesToRadians(angle_bracket_tube)))  + this.getIntersectionPoint().x;
    let y_axis = Math.abs(CA*Math.sin(this.degreesToRadians(angle_bracket_tube))) + this.getIntersectionPoint().y;

    return { x: x_axis, y:y_axis  ,z:0}
  }
  
  /***********************************************************TDP<2.2 - SINGLE**********************************************************************************/
  getIntersectionSteadyArmFixedPoint():{x:number,y:number, z:number}{

    let m1 = (this.getUpperTubeEyeClampFixedPoint().y - this.getBottomFixedPoint().y)/(this.getUpperTubeEyeClampFixedPoint().x - this.getBottomFixedPoint().x)
    let theta1 = this.radiansToDegress(Math.atan(m1));

    let m2 = Math.tan(this.degreesToRadians(this.steady_arm.alpha));
    let b2 = this.getSteadyArmEndPoint().y - ((this.getSteadyArmEndPoint().x)*m2);

    let m3 = -Math.tan(this.degreesToRadians(90-theta1));
    let b3 = this.getIntersectionTubeFixedPoint().y - ((this.getIntersectionTubeFixedPoint().x)*m3);
    
    let intersection_x = (b3-b2)/(m2-m3);
    let intersection_y = intersection_x*m3 + b3;

    return { x: intersection_x, y:intersection_y, z:0}

  }

  getSteadyArmFixedPoint():{x:number, y:number, z:number}{

    let x0 = 0;
    let y0 = 0;
    let z0 = 0;

    if(this.model.type.configuration == "TDP<2.2" && this.model.type.contactWireConfiguration == "SINGLE"){

      let angleModified = (180 + this.steady_arm.swivel_clip.cw_angle + this.steady_arm.alpha);

      x0 =  this.getCwAxis().x - this.steady_arm.swivel_clip.cw_height * Math.cos(this.degreesToRadians(angleModified));

      y0 =  this.getCwAxis().y - this.steady_arm.swivel_clip.cw_height * Math.sin(this.degreesToRadians(angleModified)); 

    }else if(this.model.type.configuration == "TDP<2.2" && this.model.type.contactWireConfiguration == "DOUBLE"){

      let lenght = this.steady_arm.hook_end_fitting.L - this.steady_arm.hook_end_fitting.a;

      let angleModified = (180 + this.steady_arm.swivel_clip.cw_angle + this.steady_arm.alpha);

      x0 =  this.getCwAxis().x - this.steady_arm.swivel_clip.cw_height * Math.cos(this.degreesToRadians(angleModified));

      y0 =  this.getCwAxis().y - this.steady_arm.swivel_clip.cw_height * Math.sin(this.degreesToRadians(angleModified)); 

      z0 = lenght;

    };



    return { x: x0, y:y0, z:z0  }
  }

  getSteadyArmEndPoint():{x:number, y:number, z:number}{

    let x0 = 0;
    let y0 = 0;
    let z0 = 0;

    if(this.model.type.configuration == "TDP<2.2" && this.model.type.contactWireConfiguration == "SINGLE"){

      x0 =  this.getSteadyArmFixedPoint().x + this.steady_arm.end_distance * Math.cos(this.degreesToRadians(360 + this.steady_arm.alpha));

      y0 =  this.getSteadyArmFixedPoint().y + this.steady_arm.end_distance * Math.sin(this.degreesToRadians(360 + this.steady_arm.alpha)); 

    }else if(this.model.type.configuration == "TDP<2.2" && this.model.type.contactWireConfiguration == "DOUBLE"){

      let lenght = this.steady_arm.hook_end_fitting.L - this.steady_arm.hook_end_fitting.a;

      x0 =  this.getSteadyArmFixedPoint().x + this.steady_arm.end_distance * Math.cos(this.degreesToRadians(360 + this.steady_arm.alpha));

      y0 =  this.getSteadyArmFixedPoint().y + this.steady_arm.end_distance * Math.sin(this.degreesToRadians(360 + this.steady_arm.alpha)); 

      z0 = lenght;

    };

    return { x: x0, y:y0, z:z0  }
  }

  getIntersectionPoint():{x:number, y:number, z:number}{

    let x0 = 0;
    let y0 = 0;
    let z0 = 0;

    if(this.model.type.configuration == "TDP<2.2" && this.model.type.contactWireConfiguration == "SINGLE"){

      let m1 = (this.getUpperTubeEyeClampFixedPoint().y - this.getBottomFixedPoint().y)/(this.getUpperTubeEyeClampFixedPoint().x - this.getBottomFixedPoint().x)
      let b1 = (this.getBottomFixedPoint().y)- ((this.getBottomFixedPoint().x)*m1);

      let m2 = Math.tan(this.degreesToRadians(this.steady_arm.alpha));
      let b2 = this.getSteadyArmEndPoint().y - ((this.getSteadyArmEndPoint().x)*m2);

      x0 = (b1-b2)/(m2-m1);
      y0 = x0*m1 + b1;

    }else if(this.model.type.configuration == "TDP<2.2" && this.model.type.contactWireConfiguration == "DOUBLE"){

      let lenght = this.steady_arm.hook_end_fitting.L - this.steady_arm.hook_end_fitting.a;

      let m1 = (this.getUpperTubeEyeClampFixedPoint().y - this.getBottomFixedPoint().y)/(this.getUpperTubeEyeClampFixedPoint().x - this.getBottomFixedPoint().x)
      let b1 = (this.getBottomFixedPoint().y)- ((this.getBottomFixedPoint().x)*m1);

      let m2 = Math.tan(this.degreesToRadians(this.steady_arm.alpha));
      let b2 = this.getSteadyArmEndPoint().y - ((this.getSteadyArmEndPoint().x)*m2);

      x0 = (b1-b2)/(m2-m1);
      y0 = x0*m1 + b1;
      z0 = lenght;

    }

    return { x: x0, y:y0  , z:z0}
  }

  getSteadyArmHookEndFittingPoint():{x:number,y:number, z:number}{
    let x0 = 0;

    let y0 = 0;

    let z0 = 0;

    if(this.model.type.configuration == "TDP<2.2" && this.model.type.contactWireConfiguration == "SINGLE"){

      let lenght = this.steady_arm.hook_end_fitting.L - this.steady_arm.hook_end_fitting.a

      x0 =  this.getIntersectionSteadyArmFixedPoint().x + lenght*Math.cos(this.degreesToRadians(360+this.steady_arm.alpha));

      y0 =  this.getIntersectionSteadyArmFixedPoint().y + lenght*Math.sin(this.degreesToRadians(360+this.steady_arm.alpha));

    }else if(this.model.type.configuration == "TDP<2.2" && this.model.type.contactWireConfiguration == "DOUBLE"){

      let lenght = this.steady_arm.hook_end_fitting.L - this.steady_arm.hook_end_fitting.a

      x0 =  this.getIntersectionPoint().x + lenght*Math.cos(this.degreesToRadians(360+this.steady_arm.alpha));

      y0 =  this.getIntersectionPoint().y + lenght*Math.sin(this.degreesToRadians(360+this.steady_arm.alpha));

      z0 =  lenght;

    }

    return { x: x0, y:y0  ,z:z0}

  }


  /***************************************************************************************************************************************************/
  /***************************************************************************************************************************************************/
  /***************************************************************************************************************************************************/
  /*********************************************************END STEADY ARM**************************************************************************/
  /***************************************************************************************************************************************************/
  /***************************************************************************************************************************************************/

  generateResults():{ name:string, diameter:number, thickness:number, length_tube:number, cut_length:number }[]{
    //Stay Stube
    const dimensions = [
      {
        name:"stay_tube",
        diameter:this.stay_tube.tube.d,
        thickness:this.stay_tube.tube.s,
        length_tube:this.roundToDecimals(this.getDistanceBetweenTwoPoints(this.getUpperIsolatorPoint(),this.getUpperTubeEndPoint()), 2),
        cut_length: this.roundToDecimals(this.getDistanceBetweenTwoPoints(this.getUpperIsolatorPoint(),this.getUpperTubeEndPoint()),-1)  
      },
      {
        name:"bracket_tube",
        diameter:this.bracket_tube.tube.d,
        thickness:this.bracket_tube.tube.s,
        length_tube:this.roundToDecimals(this.getDistanceBetweenTwoPoints(this.getBottomIsolatorPoint(),this.getUpperEyeClampClevisFixedPoint()),2),
        cut_length: this.roundToDecimals(this.getDistanceBetweenTwoPoints(this.getBottomIsolatorPoint(),this.getUpperEyeClampClevisFixedPoint()),-1) 
      },
      {
        name:"steady_arm",
        diameter:this.steady_arm.tube.d,
        thickness:this.steady_arm.tube.s,
        length_tube:this.roundToDecimals(this.getDistanceBetweenTwoPoints(this.getSteadyArmEndPoint(),this.getSteadyArmHookEndFittingPoint()),2),
        cut_length: this.roundToDecimals(this.getDistanceBetweenTwoPoints(this.getSteadyArmEndPoint(),this.getSteadyArmHookEndFittingPoint()),-1) 
      }
    ]

    if(this.model.type.configuration != "TDP<2.2"){
      dimensions.push({
        name:"steel_cable",
        diameter:this.stay_tube.tube.d,
        thickness:this.stay_tube.tube.s,
        length_tube:this.roundToDecimals(this.getDistanceBetweenTwoPoints(this.getUpperIsolatorPoint(),this.getUpperTubeEndPoint()),2),
        cut_length: this.roundToDecimals(this.getDistanceBetweenTwoPoints(this.getUpperIsolatorPoint(),this.getUpperTubeEndPoint()),-1) 
      })
    }

    if(this.model.type.configuration == "CAI"){
      dimensions.push({
        name:"register_arm",
        diameter:this.stay_tube.tube.d,
        thickness:this.stay_tube.tube.s,
        length_tube:this.roundToDecimals(this.getDistanceBetweenTwoPoints(this.getUpperIsolatorPoint(),this.getUpperTubeEndPoint()),2),
        cut_length: this.roundToDecimals(this.getDistanceBetweenTwoPoints(this.getUpperIsolatorPoint(),this.getUpperTubeEndPoint()),-1)
      })
    }

    return dimensions;
  }

  getCenters():{cantilever_center:{x:number,y:number,z:number}, global_center:{x:number,y:number,z:number}}{
    let cantilever_center = {x:0,y:0,z:0};
    let global_center = {x:0,y:0,z:0};

    cantilever_center.x = this.pv/2;

    cantilever_center.y = (this.getUpperPoleFixedPoint().y - this.getBottomPoleFixedPoint().y)/2 + this.getBottomPoleFixedPoint().y ;
    cantilever_center.z = this.pv*0.7;

    global_center.x = this.pv;

    global_center.y = this.getUpperPoleFixedPoint().y/2;

    global_center.z = this.pv*0.5;

    return {cantilever_center, global_center};
  }


  generateLinks():{x1:number,y1:number,z1:number, x2:number,y2:number,z2:number, dimension_line:boolean}[]{

    let links:{x1:number,y1:number,z1:number, x2:number,y2:number,z2:number, dimension_line:boolean}[] = [];

    links.push({  x1: 0, y1:this.esc ,z1:0,  x2: 0, y2:6500,z2:0, dimension_line:false });

    //upper links
    links.push({  x1: this.getUpperPoleFixedPoint().x, y1:this.getUpperPoleFixedPoint().y, z1:0, x2:this.getUpperFixedPoint().x, y2:this.getUpperFixedPoint().y, z2:0,  dimension_line:true });

    links.push({  x1:this.getUpperFixedPoint().x, y1:this.getUpperFixedPoint().y, z1:0, x2: this.getUpperIsolatorPoint().x, y2:this.getUpperIsolatorPoint().y, z2:0, dimension_line:true });

    links.push({  x1:this.getUpperIsolatorPoint().x, y1:this.getUpperIsolatorPoint().y, z1:0, x2: this.getUpperTubeEyeClampTubeFixedPoint().x, y2:this.getUpperTubeEyeClampTubeFixedPoint().y, z2:0, dimension_line:true });


    links.push({  x1: this.getUpperTubeEyeClampTubeFixedPoint().x, y1:this.getUpperTubeEyeClampTubeFixedPoint().y , z1:0,  x2: this.getWireSupportFixedPoint().x, y2:this.getWireSupportFixedPoint().y, z2:0, dimension_line:true });

    links.push({  x1: this.getUpperTubeEyeClampTubeFixedPoint().x, y1:this.getUpperTubeEyeClampTubeFixedPoint().y ,z1:0,  x2: this.getUpperTubeEyeClampFixedPoint().x, y2:this.getUpperTubeEyeClampFixedPoint().y, z2:0, dimension_line:true });

    links.push({  x1: this.getWireSupportFixedPoint().x, y1:this.getWireSupportFixedPoint().y , z1:0,  x2: this.getUpperTubeEndPoint().x, y2:this.getUpperTubeEndPoint().y, z2:0, dimension_line:true });

    links.push({  x1: this.getWireSupportFixedPoint().x, y1:this.getWireSupportFixedPoint().y ,z1:0,  x2: this.getMwAxis().x, y2:this.getMwAxis().y, z2:0, dimension_line:true });

    //bottom links
    links.push({  x1: this.getBottomPoleFixedPoint().x, y1:this.getBottomPoleFixedPoint().y , z1:0,  x2: this.getBottomFixedPoint().x, y2:this.getBottomFixedPoint().y, z2:0, dimension_line:true });

    links.push({  x1: this.getUpperEyeClampClevisFixedPoint().x, y1:this.getUpperEyeClampClevisFixedPoint().y , z1:0,  x2: this.getUpperTubeEyeClampFixedPoint().x, y2:this.getUpperTubeEyeClampFixedPoint().y, z2:0, dimension_line:false });

    links.push({  x1: this.getBottomFixedPoint().x, y1:this.getBottomFixedPoint().y , z1:0,  x2: this.getBottomIsolatorPoint().x, y2:this.getBottomIsolatorPoint().y, z2:0, dimension_line:true });


    links.push({  x1: this.getBottomIsolatorPoint().x, y1:this.getBottomIsolatorPoint().y , z1:0,  x2: this.getUpperEyeClampClevisFixedPoint().x, y2:this.getUpperEyeClampClevisFixedPoint().y, z2:0, dimension_line:true });
    
    //steady arm
    if(this.model.type.configuration == "TDP<2.2" && this.model.type.contactWireConfiguration == "SINGLE"){

      links.push({  x1: this.getSteadyArmFixedPoint().x, y1:this.getSteadyArmFixedPoint().y , z1:this.getSteadyArmEndPoint().z,  x2: this.getCwAxis().x, y2:this.getCwAxis().y, z2:this.getCwAxis().z, dimension_line:true });

      links.push({  x1: this.getSteadyArmFixedPoint().x, y1:this.getSteadyArmFixedPoint().y , z1:this.getSteadyArmFixedPoint().z,  x2: this.getSteadyArmEndPoint().x, y2:this.getSteadyArmEndPoint().y, z2:this.getSteadyArmEndPoint().z, dimension_line:true });

      links.push({  x1: this.getIntersectionTubeFixedPoint().x, y1:this.getIntersectionTubeFixedPoint().y , z1:this.getIntersectionTubeFixedPoint().z,  x2: this.getIntersectionSteadyArmFixedPoint().x, y2:this.getIntersectionSteadyArmFixedPoint().y, z2:this.getIntersectionSteadyArmFixedPoint().z, dimension_line:true });

      links.push({  x1: this.getIntersectionSteadyArmFixedPoint().x, y1:this.getIntersectionSteadyArmFixedPoint().y , z1:this.getIntersectionSteadyArmFixedPoint().z,  x2: this.getSteadyArmHookEndFittingPoint().x, y2:this.getSteadyArmHookEndFittingPoint().y, z2:this.getSteadyArmHookEndFittingPoint().z, dimension_line:true });

      links.push({  x1: this.getSteadyArmHookEndFittingPoint().x, y1:this.getSteadyArmHookEndFittingPoint().y , z1:this.getSteadyArmHookEndFittingPoint().z,  x2: this.getSteadyArmFixedPoint().x, y2:this.getSteadyArmFixedPoint().y, z2:this.getSteadyArmHookEndFittingPoint().z, dimension_line:true });


    }else if(this.model.type.configuration == "TDP<2.2" && this.model.type.contactWireConfiguration == "DOUBLE"){

      links.push({  x1: this.getSteadyArmFixedPoint().x, y1:this.getSteadyArmFixedPoint().y , z1:this.getSteadyArmFixedPoint().z,  x2: this.getCwAxis().x, y2:this.getCwAxis().y, z2:this.getSteadyArmFixedPoint().z, dimension_line:true });
      links.push({  x1: this.getSteadyArmFixedPoint().x, y1:this.getSteadyArmFixedPoint().y , z1:-this.getSteadyArmFixedPoint().z,  x2: this.getCwAxis().x, y2:this.getCwAxis().y, z2:-this.getSteadyArmFixedPoint().z, dimension_line:true });

      links.push({  x1: this.getSteadyArmFixedPoint().x, y1:this.getSteadyArmFixedPoint().y , z1:this.getSteadyArmFixedPoint().z,  x2: this.getSteadyArmEndPoint().x, y2:this.getSteadyArmEndPoint().y, z2:this.getSteadyArmEndPoint().z, dimension_line:true });
      links.push({  x1: this.getSteadyArmFixedPoint().x, y1:this.getSteadyArmFixedPoint().y , z1:-this.getSteadyArmFixedPoint().z,  x2: this.getSteadyArmEndPoint().x, y2:this.getSteadyArmEndPoint().y, z2:-this.getSteadyArmEndPoint().z, dimension_line:true });

      links.push({  x1: this.getIntersectionPoint().x, y1:this.getIntersectionPoint().y , z1:this.getIntersectionPoint().z,  x2: this.getIntersectionPoint().x, y2:this.getIntersectionPoint().y, z2:0, dimension_line:true });
      links.push({  x1: this.getIntersectionPoint().x, y1:this.getIntersectionPoint().y , z1:-this.getIntersectionPoint().z,  x2: this.getIntersectionPoint().x, y2:this.getIntersectionPoint().y, z2:0, dimension_line:true });

      links.push({  x1: this.getIntersectionPoint().x, y1:this.getIntersectionPoint().y , z1:this.getIntersectionPoint().z,  x2: this.getSteadyArmHookEndFittingPoint().x, y2:this.getSteadyArmHookEndFittingPoint().y, z2:this.getSteadyArmHookEndFittingPoint().z, dimension_line:true });
      links.push({  x1: this.getIntersectionPoint().x, y1:this.getIntersectionPoint().y , z1:-this.getIntersectionPoint().z,  x2: this.getSteadyArmHookEndFittingPoint().x, y2:this.getSteadyArmHookEndFittingPoint().y, z2:-this.getSteadyArmHookEndFittingPoint().z, dimension_line:true });

      links.push({  x1: this.getSteadyArmHookEndFittingPoint().x, y1:this.getSteadyArmHookEndFittingPoint().y , z1:this.getSteadyArmHookEndFittingPoint().z,  x2: this.getSteadyArmFixedPoint().x, y2:this.getSteadyArmFixedPoint().y, z2:this.getSteadyArmFixedPoint().z, dimension_line:true });

      links.push({  x1: this.getSteadyArmHookEndFittingPoint().x, y1:this.getSteadyArmHookEndFittingPoint().y , z1:-this.getSteadyArmHookEndFittingPoint().z,  x2: this.getSteadyArmFixedPoint().x, y2:this.getSteadyArmFixedPoint().y, z2:-this.getSteadyArmFixedPoint().z, dimension_line:true });
    };


    return links;
  }

  generatePoints(): {x: number, y: number, z: number}[] {
    let pointsSet = new Set<string>(); // To store unique points as strings
    let points: {x: number, y: number, z: number}[] = [];

    const links = this.generateLinks();

    // Iterate through each link and add both points (x1, y1, z1) and (x2, y2, z2) to the set
    links.forEach(link => {
      if(link.dimension_line){
        const point1 = `${link.x1},${link.y1},${link.z1}`;
        const point2 = `${link.x2},${link.y2},${link.z2}`;

        pointsSet.add(point1); // Add the starting point of the link
        pointsSet.add(point2); // Add the ending point of the link
      }
    });

    // Convert the set of unique points back into an array of objects {x, y, z}
    pointsSet.forEach(pointStr => {
      const [x, y, z] = pointStr.split(',').map(Number); // Split the string and convert to numbers
      points.push({x, y, z});
    });

    return points;
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
      data.model,
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
