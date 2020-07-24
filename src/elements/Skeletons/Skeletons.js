import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 415,
    margin: theme.spacing(2),
  },
  media: {
    height: 190,
  },
}));

function Media() {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Skeleton animation="wave" variant="circle" width={40} height={40} />
          }
          action={null}
          
          title={
            <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
          }
          subheader={
            <Skeleton animation="wave" height={10} width="40%" />
          }
        />
        
        <Skeleton animation="wave" variant="rect" className={classes.media} />

        <CardContent>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
        </CardContent>
      </Card>
    </Grid>
  );
}

export default function Skeletons(props) {
  const { qtys } = props;
  return (
    <Grid container >
       {
         Array.from(new Array(qtys)).map((item, index)=> <Media key={index}/>)
       }
    </Grid>
  );
}

Skeletons.propTypes = {
  qtys: PropTypes.number.isRequired,
};
