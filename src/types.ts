export type LoadingResultState = {
   state: 'Loading';
};

export type SuccessResultState<data> = {
   state: 'Success';
   data: data;
};

export type ErrorResultState = {
   state: 'Error';
   error: { message: string };
};

export type ResultState<data> =
   | LoadingResultState
   | SuccessResultState<data>
   | ErrorResultState;

export interface UserDTO {
   id: number;
   name: string;
   username: string;
   email: string;
   address: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
      geo: {
         lat: string;
         lng: string;
      };
   };
   phone: string;
   website: string;
   company: {
      name: string;
      catchPhrase: string;
      bs: string;
   };
}
