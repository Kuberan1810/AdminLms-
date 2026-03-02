import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface StudentInfo {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const initialState: StudentInfo = {
  name: "Name of the student",
  email: "Student mail",
  phone: "+91 9876543210",
  password: "********"
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    updateStudentInfo: (state, action: PayloadAction<StudentInfo>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateStudentInfo } = studentSlice.actions;
export default studentSlice.reducer;
