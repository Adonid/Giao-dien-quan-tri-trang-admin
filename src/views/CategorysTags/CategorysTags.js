import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { 
  Card,
  CardContent,
  LinearProgress,
} from '@material-ui/core';
import { ToolBar, Categorys, Tags } from './components';
import { connect } from 'react-redux';
import { GetAllCategorysTags } from 'redux/actions';

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3)
    },
    content: {
      marginTop: theme.spacing(2)
    },
    contentLoading: {
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3),
      width: "50%",
      textAlign: "center",
      margin: "auto",
    },
    cardLoading: {
      backgroundColor: "#9e9e9e14"
    },
  }));

const CategorysTags = props => {
    const { loading, getAllCategorysTags, categorys, tags } = props;
    const classes = useStyles();

    useEffect(() => {
      getAllCategorysTags();
    },[]);

    if(loading){
      return (
        <React.Fragment>
          <Card className={classes.cardLoading}>
            <CardContent className={classes.contentLoading}>
              <LinearProgress />
            </CardContent>
          </Card>
        </React.Fragment>
      )
    }

    return (
        <div className={classes.root}>
            <ToolBar />
            <div className={classes.content}>
                <Categorys categorys={categorys} />

                <Tags tags={tags} />
            </div>
        </div>
    );
};

CategorysTags.propTypes = {
  loading: PropTypes.bool.isRequired, 
  categorys: PropTypes.array.isRequired, 
  tags: PropTypes.array.isRequired, 
  getAllCategorysTags: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    loading: state.dataCategoryTag.loading,
    categorys: state.dataCategoryTag.categorysList,
    tags: state.dataCategoryTag.tagsList,
})

const mapDispatchToProps = dispatch => ({
    getAllCategorysTags: () => dispatch(GetAllCategorysTags()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CategorysTags)