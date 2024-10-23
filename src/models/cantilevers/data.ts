export const OptionsCantileverData:{ id:number, model:ModelInterface }[] = [
  {
    id:1,
    model:{
      code:"GY",
      name:"German",
      type:{
        configuration:"TDP<2.2",
        contactWireConfiguration:'SINGLE',
      },
      icon:'cantilever_gy_type_1',
    },
  },
  {
    id:2,
    model:{
      code:"GY",
      name:"German",
      type:{
        configuration:"TDP<2.2",
        contactWireConfiguration:'DOUBLE',
      },
      icon:'cantilever_gy_type_1',
    },
  },
  {
    id:3,
    model:{
      code:"GY",
      name:"German",
      type:{
        configuration:"SBA",
        contactWireConfiguration:'SINGLE',
      },
      icon:'cantilever_gy_type_4',
    },
  },
  {
    id:4,
    model:{
      code:"GY",
      name:"German",
      type:{
        configuration:"SBA",
        contactWireConfiguration:'DOUBLE',
      },
      icon:'cantilever_gy_type_4',
    },
  },
  {
    id:5,
    model:{
      code:"GY",
      name:"German",
      type:{
        configuration:"CAI",
        contactWireConfiguration:'SINGLE',
      },
      icon:'cantilever_gy_type_2',
    },
  },
  {
    id:6,
    model:{
      code:"GY",
      name:"German",
      type:{
        configuration:"TDP>2.2",
        contactWireConfiguration:'SINGLE',
      },
      icon:'cantilever_gy_type_3',
    },
  },
];

export const CantileversData: CantileverParams[] = [
  {
    id:1,
    external_id:"#01A-001",
    pole:"23A",
    pole_id:12,
    via:"#01A",
    via_id:1,
    location_id:24,
    location:"Patio Taller",
    user_id:12,
    created_by:"Dalton Chiarelli",
    created_at: new Date(),
    updated_at: new Date(),
    params: {
      model:{
        code:"GY",
        name:"German",
        type:{
          configuration:"TDP<2.2",
          contactWireConfiguration:"SINGLE"
        },
        icon:'cantilever_gy_type_1',
      },
      contact_wire_height: 4600,
      system_height: 1600,
      zig_zag: -150,
      bitola: 400,
      esc: 0,
      pv: 2150,
      stay_tube:{
        alpha:4,
        tube:{
          id:1,
          order_id:"8WL2175-4B",
          designation:"Steel tube 60.3x4.0(2“)",
          weight:5.5,
          max_delivery_length:7,
          d:60.3,
          s:4
        },
        isolator:{
          id:1,
          order_id:"8WL3088-2C",
          designation:"Composite insulator tongue 21/tube 60.3",
          weight:2.1,
          operating_load:190,
          d:56,
          eye_length:356,
          tube_length:89
        },
        mw_support:{
          wireSupport:{
            id:1,
            order_id:"8WL2031-4B",
            designation:"Catenary wire support clamp 55-60.3/12",
            weight:2.66,
            operating_load:12,
            failing_operating_load:36,
            d:60.3,
            h:121
          },
          end_distance:200,
          eye_clamp_distance: 250,
        },
        eye_clamp:{
          id:1,
          order_id:"8WL2115-4",
          designation:"Eye clamp 60.3",
          weight:1.10,
          operating_load:7, //Kilo Newtons
          failing_operating_load:21,//Kilo Newtons
          h:81,//mm
          d:60.3//mm
        },
        swivel_bracket:{
          id:1,
          order_id:"8WL2125-5",
          designation:"Cantilever swivel bracket",
          weight:0.56,
          operating_load_f1:21.7,
          failing_operating_load_f1:65,
          operating_load_f2:10,
          failing_operating_load_f2:30,
          x_pin:25
        },
        swivel_clevis:{
          id:1,
          order_id:"8WL2126-2",
          designation:"Swivel with clevis 21",
          weight:0.56,
          operating_load:26.7,
          failing_operating_load:80,
          pin_eye:42
        }
      },
      register_arm:null,
      bracket_tube:{
        tube:{
          id:1,
          order_id:"8WL2175-4B",
          designation:"Steel tube 60.3x4.0(2“)",
          weight:5.5,
          max_delivery_length:7,
          d:60.3,
          s:4
        },
        isolator:{
          id:1,
          order_id:"8WL3088-2C",
          designation:"Composite insulator tongue 21/tube 60.3",
          weight:2.1,
          operating_load:190,
          d:56,
          eye_length:356,
          tube_length:89
        },
        swivel_bracket:{
          id:1,
          order_id:"8WL2125-5",
          designation:"Cantilever swivel bracket",
          weight:0.56,
          operating_load_f1:21.7,
          failing_operating_load_f1:65,
          operating_load_f2:10,
          failing_operating_load_f2:30,
          x_pin:25
        },
        swivel_clevis:{
          id:1,
          order_id:"8WL2126-2",
          designation:"Swivel with clevis 21",
          weight:0.56,
          operating_load:26.7,
          failing_operating_load:80,
          pin_eye:42
        },
        clevis_end_fitting:{
          id:1,
          order_id:"8WL6221-7",
          designation:"Clevis end fitting 60.3",
          weight:1.71,
          operating_load:7.5,
          failing_operating_load:22.5,
          hook_x_distance:62,
          a:75,
          d:62,
          L:122
        },
        eye_clamp:{
          id:1,
          order_id:"8WL2114-7",
          designation:"Eye clamp 60.3",
          weight:1.10,
          operating_load:5, //Kilo Newtons
          failing_operating_load:15,//Kilo Newtons
          h:73,//mm
          d:60.3//mm
        },
      },
      steady_arm:{
        alpha:-4,
        end_distance:40,
        eye_clamp_distance:null,
        stainless_steel_wire_rope:null,
        tube:{
          id:1,
          order_id:"8WL2175-0A",
          designation:"Steel tube 26.9x3.6 (3/4“)",
          weight:2.07,
          max_delivery_length:7,
          d:26.9,
          s:3.6
        },
        eye_clamp:null,
        hook_end_fitting:{
          id:1,
          order_id:"8WL2102-2",
          designation:"Hook end fitting 26/26.9",
          weight:1,
          operating_load:6,
          failing_operating_load:18,
          a:73,
          d:28.5,
          L:118
        },
        swivel_clip:{
          id:1,
          order_id:"8WL2004-0",
          designation:"Swivel clip holder 26/26.9-100-R",
          weight:0.4,
          operating_load:2.5,
          failing_operating_load:7.5,
          width:60,
          cw_height:100,
          cw_angle:94
        }
      }
    }
  },
  {
    id:2,
    external_id:"#01A-002",
    pole:"23B",
    pole_id:13,
    via:"#01A",
    via_id:1,
    location_id:24,
    location:"Patio Taller",
    user_id:12,
    created_by:"Dalton Chiarelli",
    created_at: new Date(),
    updated_at: new Date(),
    params: {
      model:{
        code:"GY",
        name:"German",
        type:{
          configuration:"SBA",
          contactWireConfiguration:"SINGLE"
        },
        icon:'cantilever_gy_type_4'
      },
      contact_wire_height: 4600,
      system_height: 1600,
      zig_zag: -150,
      bitola: 400,
      esc: 0,
      pv: 2150,
      stay_tube:{
        alpha:4,
        tube:{
          id:1,
          order_id:"8WL2175-4B",
          designation:"Steel tube 60.3x4.0(2“)",
          weight:5.5,
          max_delivery_length:7,
          d:60.3,
          s:4
        },
        isolator:{
          id:1,
          order_id:"8WL3088-2C",
          designation:"Composite insulator tongue 21/tube 60.3",
          weight:2.1,
          operating_load:190,
          d:56,
          eye_length:356,
          tube_length:89
        },
        mw_support:{
          wireSupport:{
            id:1,
            order_id:"8WL2031-4B",
            designation:"Catenary wire support clamp 55-60.3/12",
            weight:2.66,
            operating_load:12,
            failing_operating_load:36,
            d:60.3,
            h:121
          },
          end_distance:200,
          eye_clamp_distance: 250,
        },
        eye_clamp:{
          id:1,
          order_id:"8WL2115-4",
          designation:"Eye clamp 60.3",
          weight:1.10,
          operating_load:7, //Kilo Newtons
          failing_operating_load:21,//Kilo Newtons
          h:81,//mm
          d:60.3//mm
        },
        swivel_bracket:{
          id:1,
          order_id:"8WL2125-5",
          designation:"Cantilever swivel bracket",
          weight:0.56,
          operating_load_f1:21.7,
          failing_operating_load_f1:65,
          operating_load_f2:10,
          failing_operating_load_f2:30,
          x_pin:25
        },
        swivel_clevis:{
          id:1,
          order_id:"8WL2126-2",
          designation:"Swivel with clevis 21",
          weight:0.56,
          operating_load:26.7,
          failing_operating_load:80,
          pin_eye:42
        }
      },
      register_arm:null,
      bracket_tube:{
        tube:{
          id:1,
          order_id:"8WL2175-4B",
          designation:"Steel tube 60.3x4.0(2“)",
          weight:5.5,
          max_delivery_length:7,
          d:60.3,
          s:4
        },
        isolator:{
          id:1,
          order_id:"8WL3088-2C",
          designation:"Composite insulator tongue 21/tube 60.3",
          weight:2.1,
          operating_load:190,
          d:56,
          eye_length:356,
          tube_length:89
        },
        swivel_bracket:{
          id:1,
          order_id:"8WL2125-5",
          designation:"Cantilever swivel bracket",
          weight:0.56,
          operating_load_f1:21.7,
          failing_operating_load_f1:65,
          operating_load_f2:10,
          failing_operating_load_f2:30,
          x_pin:25
        },
        swivel_clevis:{
          id:1,
          order_id:"8WL2126-2",
          designation:"Swivel with clevis 21",
          weight:0.56,
          operating_load:26.7,
          failing_operating_load:80,
          pin_eye:42
        },
        clevis_end_fitting:{
          id:1,
          order_id:"8WL6221-7",
          designation:"Clevis end fitting 60.3",
          weight:1.71,
          operating_load:7.5,
          failing_operating_load:22.5,
          hook_x_distance:62,
          a:75,
          d:62,
          L:122
        },
        eye_clamp:{
          id:1,
          order_id:"8WL2114-7",
          designation:"Eye clamp 60.3",
          weight:1.10,
          operating_load:5, //Kilo Newtons
          failing_operating_load:15,//Kilo Newtons
          h:73,//mm
          d:60.3//mm
        },
      },
      steady_arm:{
        alpha:-4,
        end_distance:100,
        eye_clamp_distance:200,
        stainless_steel_wire_rope:{
          id:1,
          order_id:"8WL7093-2",
          designation:"Wire rope 6",
          weight:0.138,
          min_breaking_force:18.80,
          d:6
        },
        tube:{
          id:1,
          order_id:"8WL2175-2B",
          designation:"Steel tube 42.4x4.0 (1 1/4“)",
          weight:3.79,
          max_delivery_length:7,
          d:42.4,
          s:4
        },
        eye_clamp:{
          id:1,
          order_id:"8WL2113-5",
          designation:"Eye clamp 32/33.7 to 42/42.4",
          weight:0.85,
          operating_load:5, //Kilo Newtons
          failing_operating_load:15,//Kilo Newtons
          h:42.4,//mm
          d:70//mm
        },
        hook_end_fitting:{
          id:1,
          order_id:"8WL2104-5",
          designation:"Hook end fitting 42/42.4",
          weight:1.06,
          operating_load:6,
          failing_operating_load:18,
          a:65,
          d:45,
          L:110
        },
        swivel_clip:{
          id:1,
          order_id:"8WL2005-0",
          designation:"Swivel clip holder 42/42.4-16R",
          weight:0.36,
          operating_load:2.5,
          failing_operating_load:7.5,
          width:45,
          cw_height:61,
          cw_angle:90
        }
      }
    }
  }
];
