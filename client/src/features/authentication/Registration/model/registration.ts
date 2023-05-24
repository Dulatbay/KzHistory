import {createAsyncThunk} from "@reduxjs/toolkit";
import {sessionApi} from "@/entities/session/api/sessionApi";
import {isFetchBaseQueryError} from "@/shared/api";

type Params = {
  email: Email
  username: string
  password: string
}

export const registrationThunk = createAsyncThunk<void, Params, { state: RootState }>(
  'authentication/RegistrationPage',
  async (body: Params, { dispatch }) => {
    try {
      await dispatch(sessionApi.endpoints.login.initiate(body)).unwrap()
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        if (typeof error.data === 'string') {
          throw new Error(error.data)
        }
      }

      throw new Error('Unknown error')
    }
  }
)
