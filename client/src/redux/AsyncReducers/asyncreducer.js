export const AsyncReducer = (builder, thunk) => {
    builder
        .addCase(thunk.pending, (state) => {
            state.isLoading = true;
            state.error.content = null;
        })
        .addCase(thunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error.status = false;
            state.data = action.payload;
            if (action.payload.resetpassword) {
                state.isAuthenticated = false;
                state.isResetPasswords = action.payload.success
            }
            else {
                state.isAuthenticated = action.payload.success;
            }
        })
        .addCase(thunk.rejected, (state, action) => {
            if (action.payload.gologin) {
                state.isLoading = false;
                state.error.status = false;
                state.error.message = action.payload.message
                state.error.content = action.payload
            }
            else {
                state.isLoading = false;
                state.error.status = true;
                state.error.message = action.payload.message
                state.error.content = action.payload
            }
        });
};

export const HRAsyncReducer = (builder, thunk) => {
    builder
        .addCase(thunk.pending, (state) => {
            state.isLoading = true;
            state.error.content = null;
        })
        .addCase(thunk.fulfilled, (state, action) => {
            if ((action.payload.type == "signup") || (action.payload.type == "checkHR")) {
                state.isSignUp = true
                state.isLoading = false;
                state.isAuthenticated = true
                state.error.status = false;
                state.data = action.payload;
            }
        })
        .addCase(thunk.rejected, (state, action) => {
            if (action.payload.type == "signup") {
                state.isSignUp = false
                state.isLoading = false;
                state.error.status = true;
                state.error.message = action.payload.message
                state.error.content = action.payload
            }
            else if (action.payload.gologin) {
                state.isSignUp = false
                state.isLoading = false;
                state.isAuthenticated = false
                state.error.status = false;
                state.error.message = action.payload.message
                state.error.content = action.payload
            }
            else {
                state.isLoading = false;
                state.error.status = true;
                state.error.message = action.payload.message
                state.error.content = action.payload
            }
        });
}