import { CREATE_VITAL, READ_VITALS } from "../action/vital-action";

const initialState = {
  allVitals: [],
  individualVital: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_VITAL:
      const newVital = {
        _id: action.vitalData._id,
        temperature: action.vitalData.temperature,
        systolicPressure: action.vitalData.systolicPressure,
        diastolicPressure: action.vitalData.diastolicPressure,
        sp02: action.vitalData.sp02,
        pulseRate: action.vitalData.pulseRate,
        user: action.vitalData.user,
      };
      return { ...state, allVitals: state.allVitals.concat(newVital) };
    case READ_VITALS:
      // console.log("REDUCER: ", action.vitals);
      return {
        allVitals: action.vitals,
      };
    default:
      return state;
  }
};
