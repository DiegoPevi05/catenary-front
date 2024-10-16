export {};
declare global{
  interface WireSupport{
    id:number;
    order_id:string;
    designation:string;
    weight:number;
    operating_load:number; //Kilo Newtons
    failing_operating_load:number;//Kilo Newtons
    d:number;
    h:number;
  }

  interface SteelTube{
    id:number;
    order_id:string;
    designation:string;
    weight:number;
    max_delivery_length:number;
    d:number;// mm
    s:number;// mm
  }

  interface Isolator{
    id:number;
    order_id:string;
    designation:string;
    weight:number;
    operating_load:number; //Kilo Newtons
    d:number;//mm
    eye_length:number;
    tube_length:number;
  }

  interface HookEndFitting{
    id:number;
    order_id:string;
    designation:string;
    weight:number;
    operating_load:number; //Kilo Newtons
    failing_operating_load:number;//Kilo Newtons
    L:number;//mm
    a:number;//mm
    d:number;//mm
  }

  interface EyeClamp{
    id:number;
    order_id:string;
    designation:string;
    weight:number;
    operating_load:number; //Kilo Newtons
    failing_operating_load:number;//Kilo Newtons
    h:number;//mm
    d:number;//mm
  }

  interface ClevisEndFitting{
    id:number;
    order_id:string;
    designation:string;
    weight:number;
    operating_load:number; //Kilo Newtons
    failing_operating_load:number;//Kilo Newtons
    a:number;//mm
    d:number;//mm
    L:number;//mm
  }

  interface SwivelBracket{
    id:number;
    order_id:string;
    designation:string;
    weight:number;
    operating_load_f1:number;
    failing_operating_load_f1:number;
    operating_load_f2:number;
    failing_operating_load_f2:number;
    x_pin:number;
  }
  interface SwivelClevis{
    id:number;
    order_id:string;
    designation:string;
    weight:number;
    operating_load:number;
    failing_operating_load:number;
    pin_eye:number;
  }

  interface SwivelClip{
    id:number;
    order_id:string;
    designation:string;
    weight:number;
    operating_load:number; //Kilo Newtons
    failing_operating_load:number;//Kilo Newtons
    width:number;
    cw_height:number;//mm
    cw_angle:number;//mm
  }

  export interface CantileverGermanParams {
    type: 'TDP<2.2' | 'TDP>2.2' | 'CAI' | 'SBA';
    contact_wire_height: number;
    system_height: number;
    zig_zag: number;
    bitola: number;
    esc: number;
    pv: number;
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
      tube:SteelTube;
      end_distance:number;
      eye_clamp:EyeClamp;
      hook_end_fitting:HookEndFitting;
      swivel_clip:SwivelClip;
    }
  }

  export interface CantileverParams {
      id:number;
      external_id:string;
      pole:string;
      pole_id:number;
      via:string;
      via_id:number;
      location:string;
      location_id:number;
      user_id:number;
      created_by:string;
      model:{
        code:"GY"|"ES"|"FR",
        name:string;
      }
      params:CantileverGermanParams;
      created_at:Date;
      updated_at:Date;
  }
}
