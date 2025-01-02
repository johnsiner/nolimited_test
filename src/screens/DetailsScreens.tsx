import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ResultState, UserDTO } from '../types';
import axios from 'axios';
import LoadingIcon from '../icons/LoadingIcon';

const RenderNestedObject = ({
   obj,
   prefix = '',
}: {
   obj: UserDTO;
   prefix?: string;
}) => {
   return (
      <dl className='className="-my-3 divide-y divide-gray-100 text-sm"'>
         {Object.entries(obj).map(([key, value]) => {
            const fullKey = prefix ? `${prefix}.${key}` : key;

            if (
               typeof value === 'object' &&
               value !== null &&
               !Array.isArray(value)
            ) {
               // Render the key name and recursively render its nested object
               return (
                  <div key={fullKey}>
                     <dt className="font-medium text-gray-900 py-3">{key}:</dt>
                     <RenderNestedObject obj={value} prefix={fullKey} />
                  </div>
               );
            } else {
               // Display key and value
               return (
                  <div
                     key={fullKey}
                     className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4"
                  >
                     <dt className="font-medium text-gray-900">{key}</dt>
                     <dd className="text-gray-700 sm:col-span-2">
                        {String(value)}
                     </dd>
                  </div>
               );
            }
         })}
      </dl>
   );
};

export default function DetailsScreens() {
   const [fetchResult, setFetchResult] = useState<ResultState<UserDTO>>();

   const { id } = useParams();

   const fetchData = useCallback(async () => {
      try {
         setFetchResult({ state: 'Loading' });
         const response = await axios.get(
            'https://jsonplaceholder.typicode.com/users/' + id
         );
         setFetchResult({ state: 'Success', data: response.data });
      } catch (error) {
         setFetchResult({
            state: 'Error',
            error: error as { message: string },
         });
      }
   }, [id]);

   useEffect(() => {
      fetchData();
   }, [fetchData]);

   return (
      <div className="pt-10 pb-5 h-full flex flex-col items-center">
         <h1 className="text-2xl font-bold">User Details</h1>
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
               <RenderNestedObject obj={fetchResult.data} />
            )}
         </div>
      </div>
   );
}
