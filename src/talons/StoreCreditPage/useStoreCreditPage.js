import {useCallback} from 'react'
import { useMutation, useQuery } from '@apollo/client'
import {gql} from '@apollo/client'
import {useUserContext} from '@magento/peregrine/lib/context/user'
export const GET_CUSTOMER_SC_INFO = gql`
query GetCustomer($pageSize: Int!, $currentPage: Int!){
    customer {
        mp_store_credit{
            customer_id
            mp_credit_balance
            mp_credit_notification
            transactions(pageSize: $pageSize, currentPage: $currentPage) {
                    total_count
                    items{
                        transaction_id
                        customer_id
                        order_id
                        title
                        status
                        action
                        amount
                        balance
                        customer_note
                        admin_note
                        created_at
                    }
                }
        }
    }
}
`;
export const UPDATE_BALANCE_NOTI = gql`
    mutation UpdateBalanceNotification($noti:Int!){
        UpdateBalanceNotification(mp_credit_notification:$noti)
    }
`;
export const useStoreCreditPage = (props) => {
    const {noti} =props
   
    const [{isSignedIn}] = useUserContext()
    const {data: customerSCInfoData,loading:customerSCInfoLoading,error:customerSCInfoError} = useQuery(
        GET_CUSTOMER_SC_INFO,{
            variables:{
                pageSize:20,
                currentPage:1
            },
            fetchPolicy: 'cache-and-network',
            skip:!isSignedIn
        }
    );
    
    const [UpdateBalanceNotification,{data:updateData}]=useMutation(UPDATE_BALANCE_NOTI);
    
    const handleSave = useCallback(
        () => {
            UpdateBalanceNotification({
                variables:{
                    noti: noti?1:0
                }
            });
        },
        [noti],
    )

    return {
        customerSCInfoData,
        customerSCInfoLoading,
        customerSCInfoError,
        handleSave,
        
    }
}

