import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { ResultState, UserDTO } from '../types';
import LoadingIcon from '../icons/LoadingIcon';
import { Link } from 'react-router';

export default function HomeScreen() {
   const [fetchResult, setFetchResult] = useState<ResultState<UserDTO[]>>();

   const fetchData = useCallback(async () => {
      try {
         setFetchResult({ state: 'Loading' });
         const response = await axios.get(
            'https://jsonplaceholder.typicode.com/users'
         );
         setFetchResult({ state: 'Success', data: response.data });
      } catch (error) {
         setFetchResult({
            state: 'Error',
            error: error as { message: string },
         });
      }
   }, []);

   useEffect(() => {
      fetchData();
   }, [fetchData]);

   return (
      <div className="pt-10 pb-5 h-full flex flex-col items-center">
         <h1 className="text-2xl font-bold">Users</h1>
         <div className="mt-5">
            {fetchResult?.state === 'Loading' && (
               <div className="text-indigo-600">
                  <LoadingIcon />
               </div>
            )}
            {fetchResult?.state === 'Error' && (
               <div>Error: {fetchResult.error.message}</div>
            )}
            {fetchResult?.state === 'Success' && (
               <div className="divide-y divide-gray-100">
                  {fetchResult.data.map((user) => (
                     <div
                        className="flex justify-between items-center gap-5"
                        key={user.id}
                     >
                        <p className="py-5 block">{user.username}</p>
                        <Link
                           className="inline-block h-fit rounded border border-indigo-600 px-4 py-1 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
                           to={`/user/${user.id}`}
                        >
                           View Details
                        </Link>
                     </div>
                  ))}
               </div>
            )}
         </div>
      </div>
   );
}
