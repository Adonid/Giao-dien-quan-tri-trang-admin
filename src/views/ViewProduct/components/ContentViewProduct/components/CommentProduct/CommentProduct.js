import React from 'react';
import PropTypes from 'prop-types';
import { 
    Card, 
    CardContent,
    Grid,
    CardHeader,
    Divider
    
 } from '@material-ui/core';

const CommentProduct = props => {

    const { className, ...rest } = props;

    return (
        <Grid item xs={12} sm={8}>
                    
            <Card
                {...rest}
            >
                <CardHeader title="Comment & danh gia" />
                <Divider/>
                <CardContent>

                </CardContent>
            </Card>
        </Grid>
    );
};

CommentProduct.propTypes = {
    
};

export default CommentProduct;