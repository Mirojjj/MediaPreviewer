import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "Subham Phuyal",
  phone_number: "977 9841450000",
  gender: "male",
  email_address: "subham@gmail.com",
  title: "Intern",
  country: "Nepal",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserData: (state, action) => {
      console.log("triggered");
      console.log("action", action.payload);
      return { ...state, ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUserData } = userSlice.actions;

export default userSlice.reducer;
