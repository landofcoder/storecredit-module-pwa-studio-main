import React, { useState } from 'react'
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './style.css';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import { Redirect } from '@magento/venia-drivers';
import { useStoreCreditPage } from '@landofcoder/storecredit-module/src/talons/StoreCreditPage/useStoreCreditPage.js'
import { Button, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';


const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

const StoreCreditPage = (props) => {
    const [{ isSignedIn }] = useUserContext();
    
    if (!isSignedIn) {
        return <Redirect to='/' />
    }
    const ctclasses = useStyles();
    const classes = mergeClasses(defaultClasses, ctclasses, props.classes)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const [noti, setNoti] = useState(false)

    const {
        customerSCInfoData,
        customerSCInfoLoading,
        customerSCInfoError,
        handleSave,
    } = useStoreCreditPage({noti})
    if(customerSCInfoLoading){
        return 'loading...'
    }
    if(customerSCInfoError){
        return ''
    }
    const transactions = customerSCInfoData.customer.mp_store_credit.transactions.items;
    let order =1
    
    return (
        <div className={classes.root}>
            <h1 className={classes.title}>Store credit page</h1>
            <div className={classes.options}>
                <h3 className={classes.titleCredit}>My Current Balance</h3>
                <p>{customerSCInfoData.customer.mp_store_credit.mp_credit_balance}</p>
            </div>
            <div className={classes.options}>
                <h2 className={classes.title}>Transactions info</h2>
                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Order</TableCell>
                                    <TableCell>Created At</TableCell>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Amount</TableCell>
                                    <TableCell>Balance</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Note</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((transaction) => {
                                    return (
                                        <TableRow>
                                            <TableCell>{order++}</TableCell>
                                            <TableCell>{transaction.created_at}</TableCell>
                                            <TableCell>{transaction.title}</TableCell>
                                            <TableCell>{transaction.amount}</TableCell>
                                            <TableCell>{transaction.balance}</TableCell>
                                            <TableCell>{transaction.status===1?'completed':'processing'}</TableCell>
                                            <TableCell>{transaction.note}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={transactions.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>

            </div>
            <div className={classes.options}>
                <input type="checkbox" onChange={()=>setNoti(!noti)} /> Send mail
            </div>
            <div className={classes.options}>
                <Button 
                    variant='contained'
                    onClick={handleSave}
                >
                    Save
                </Button>
                
            </div>
        </div>
    )
}

export default StoreCreditPage
