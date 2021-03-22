import { useQuery } from '@apollo/client';
import {gql} from '@apollo/client';
import {useUserContext} from '@magento/peregrine/lib/context/user';

export const GET_CUSTOMER_SC_INFO = gql`
    query getBalance{
        customer{
            mp_store_credit{
                mp_credit_balance
            }
        }
    }
`;

export const useGetBalance = () => {
    const [{isSignedIn}] = useUserContext();
    const {
        data: balanceData,
        loading:balanceLoading,
        error:balanceError} = useQuery(GET_CUSTOMER_SC_INFO,{
            fetchPolicy: 'cache-and-network',
            skip:!isSignedIn});
    return {
        balanceData,
        balanceLoading,
        balanceError,
      
        
    }
}

