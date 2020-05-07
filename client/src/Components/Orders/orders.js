import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import OrderCard from './orderCard';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core/';
import {getOrders} from '../Queries/queries';

// import {graphql} from 'react-apollo';

const useStyles = makeStyles(theme => ({
    root: {
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
      flexGrow: 1,
      margin:'20px 40px'
    },
    centerGrid: {
        justifyContent:'center'
    },
    paper: {
        maxWidth: 800,
        margin: `0px auto`,
      },
  }));


function OrderList() {
    const classes = useStyles();
    const userId= "5eacfbe59ea9fddd9dcd546f";
    const {loading,error,data} = useQuery(getOrders,{
      variables: { userId },
    });
    console.log("orders",loading,error,data);

    const displayOrders = () => {
      if(loading){
        return (<CircularProgress/>);
    }else if(error !== undefined){
      return (<h1 className={classes.centerGrid}>
        ERROR
      </h1>);
    } else {
      localStorage.setItem('Grills',JSON.stringify(data.reservationByUserID));
        return data.reservationByUserID.map(order=>{
            return(<Grid key={order.id} className={classes.paper} container wrap="nowrap" spacing={2}>
            <Grid item xs zeroMinWidth>
            <OrderCard order={order}></OrderCard>
            </Grid>
          </Grid>
            )
        });
    }
    }
            return (
              <div className={classes.root}>
                  {displayOrders()}
              </div>
            );
}

export default OrderList;