import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface InstructorProfile {
  name: string;
  email: string;
  phone: string;
  instructorId: string;
  status: string;
  courses: string[]; // List of course IDs or names
  profileImage?: string;
  password: string;
}

interface InstructorState {
  profile: InstructorProfile;
  loading: boolean;
  error: string | null;
}

const initialState: InstructorState = {
  profile: {
    name: "Instructor Name",
    email: "instructor@example.com",
    phone: "+91 9876543210",
    instructorId: "INS001",
    status: "Active",
    courses: [],
    profileImage: "",
    password: "********",
  },
  loading: false,
  error: null,
};


export const fetchInstructorProfile = createAsyncThunk(
  'instructor/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
     
      return initialState.profile; // Mock data
    } catch (error) {
      return rejectWithValue('Failed to fetch instructor profile');
    }
  }
);

export const updateInstructorProfile = createAsyncThunk(
  'instructor/updateProfile',
  async (profileData: Partial<InstructorProfile>, { rejectWithValue }) => {
    try {

      return { ...initialState.profile, ...profileData }; // Mock update
    } catch (error) {
      return rejectWithValue('Failed to update instructor profile');
    }
  }
);

const instructorSlice = createSlice({
  name: 'instructor',
  initialState,
  reducers: {
    setInstructorProfile: (state, action: PayloadAction<InstructorProfile>) => {
      state.profile = action.payload;
    },
    updateInstructorInfo: (state, action: PayloadAction<Partial<InstructorProfile>>) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    addCourse: (state, action: PayloadAction<string>) => {
      if (!state.profile.courses.includes(action.payload)) {
        state.profile.courses.push(action.payload);
      }
    },
    removeCourse: (state, action: PayloadAction<string>) => {
      state.profile.courses = state.profile.courses.filter(course => course !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInstructorProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInstructorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchInstructorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateInstructorProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateInstructorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateInstructorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setInstructorProfile,
  updateInstructorInfo,
  addCourse,
  removeCourse,
  setLoading,
  setError
} = instructorSlice.actions;

export default instructorSlice.reducer;