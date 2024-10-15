export interface CantileverGermanParams {
  type: 'TDP<2.2' | 'TDP>2.2' | 'CAI' | 'SBA';
  contact_wire_height: number;
  system_height: number;
  zig_zag: number;
  upper_isolator_length: number;
  bottom_isolator_length: number;
  alpha_superior_tube: number;
  alpha_registration_arm: number;
  alpha_steady_arm: number;
  bitola: number;
  esc: number;
  pv: number;
  wire_support_wire_to_tube_length: number;
  wire_support_end_distance: number;
  wire_support_to_eye_clamp_distance: number;
  eye_clamp_eye_to_tube_length: number;
  swivel_with_clevis_pole_to_pin_distance: number;
  swivel_with_clevis_pin_to_fix_connection_length: number;
  clevis_end_fitting_pin_to_tube_length: number;
  cw_swivel_clip_holder: {
    eye_to_cw_x: number;
    eye_to_cw_y: number;
    angle_to_cw: number;
  };
  steady_arm_end_point_distance: number;
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
    params:CantileverGermanParams;
    created_at:Date;
    updated_at:Date;
}
