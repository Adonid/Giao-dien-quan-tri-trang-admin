import React from 'react';
import PropTypes from 'prop-types';
import { 
    Card, 
    CardContent,
    Grid,
    CardHeader,
    Divider
    
 } from '@material-ui/core';

const FixedContent = props => {

    const { className, ...rest } = props;

    return (
        <Grid item xs={12}>
            <Card
                {...rest}
            >
                <CardHeader title="Viết nội dung" />
                <Divider/>
                <CardContent>
                    
                </CardContent>
            </Card>
        </Grid>
    );
};

FixedContent.propTypes = {
    
};

export default FixedContent;