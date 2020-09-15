import React from 'react';
import PropTypes from 'prop-types';
import { 
    Card, 
    CardContent,
    Grid,
    CardHeader,
    Divider
    
 } from '@material-ui/core';

const SlideBar = props => {

    const { className, ...rest } = props;

    return (
        <Grid item xs={12} sm={4}>
            <Card
                {...rest}
            >
                <CardHeader title="Slide Bar" />
                <Divider/>
                <CardContent>

                </CardContent>
            </Card>
        </Grid>
    );
};

SlideBar.propTypes = {
    
};

export default SlideBar;