import { createSlice } from "@reduxjs/toolkit";

const applicantsSlice = createSlice({
    name:"applicantion",
    initialState:{
        allApplicants:[],
    },
    reducers:{
        setAllApplicants:(state,action)=>{
            state.allApplicants=action.payload;
        }
    }
});
 export const {setAllApplicants} = applicantsSlice.actions;
 export default applicantsSlice.reducer;