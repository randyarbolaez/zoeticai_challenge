import AsyncStorage from "@react-native-community/async-storage";

import ENV from "../../env";

export const CREATE_VITAL = "CREATE_VITAL";
export const READ_VITALS = "READ_VITALS";

export const createVital = (
  temperature,
  systolicPressure,
  diastolicPressure,
  sp02,
  pulseRate,
  token
) => {
  return async (dispatch, getState) => {
    const res = await fetch(`${ENV.apiUrl}/vital/create`, {
      credentials: "include",
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
      body: JSON.stringify({
        thermometer: {
          temperature,
        },
        bloodPressure: {
          systolicPressure,
          diastolicPressure,
        },
        oximeter: {
          sp02,
          pulseRate,
        },
      }),
    });

    const resData = await res.text();
    if (!res.ok) {
      console.log(res);
      throw new Error("createVital: Something went wrong");
    }

    dispatch({
      type: CREATE_VITAL,
      vitalData: {
        _id: resData._id,
        temperature,
        systolicPressure,
        diastolicPressure,
        sp02,
        pulseRate,
        user: resData.user,
      },
    });
  };
};

export const fetchAllVitals = (userId, token) => {
  return async (dispatch, getState) => {
    try {
      const res = await fetch(`${ENV.apiUrl}/user/vitals/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const resData = await res.json();

      if (!res.ok) {
        throw new Error("fetchAllVitals: Something went wrong!");
      }

      let loadedVitals = { resData }.resData;

      dispatch({
        type: READ_VITALS,
        vitals: loadedVitals,
      });
    } catch (err) {
      throw err;
    }
  };
};
