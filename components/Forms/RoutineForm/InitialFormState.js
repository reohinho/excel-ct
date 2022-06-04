const INITIAL_FORM_STATE = {
  PID: "",
  inPatient: false,
  age: "",
  weight: "",
  height: "",
  circumference: "",
  Date: new Date(),
  urgent: false,
  sedation: false,
  sedatedBy: "",
  sedationMethod: "",
  protocol: [],
  kV_a: [],
  kV_b: [],
  pitch: [],
  injectionSite: "",
  handInjection: false,
  mixedContrast: false,
  contrastType: "",
  rate: "",
  volume: "",
  directPostContrast: false,
  ttp: "",
  radiographers: [],
  radiologists: [],
  nurses: [],
  keywords: "",
  remark: "",
  delays: [""],
  examType: [],
  ctdi: "",
  IR: false,
};

export default INITIAL_FORM_STATE;
