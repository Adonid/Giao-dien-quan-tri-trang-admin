import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    root: {
      background: (props) => {
        switch (props.color) {
            case 'red':
                return 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)';
            case 'blue':
                return 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)';
            case 'green':
                return 'linear-gradient(45deg, #4CAF50 30%, #CDDC39 90%)';
            default:
                return 'linear-gradient(45deg, #999 30%, #d5d5d5 90%)';
        }
      },
      border: 0,
      borderRadius: 3,
      boxShadow: (props) => {
        switch (props.color) {
            case 'red':
                return '0 3px 5px 2px rgba(255, 105, 135, .3)';
            case 'blue':
                return '0 3px 5px 2px rgba(33, 203, 243, .3)';
            case 'green':
                return '0px 3px 5px 2px rgba(139, 195, 74, 0.57)';
            default:
                return '0px 3px 5px 2px rgb(224, 224, 224)';
        }
      },
      color: 'white',
      height: 32,
      padding: '0 25px',
      margin: 8,
    },
  });

  function Buttons(props) {
    const { color, title, ...other } = props;
    const classes = useStyles(props);
    return <Button className={classes.root} {...other} >{title}</Button>;
  }

  Buttons.propTypes = {
    color: PropTypes.oneOf(['blue', 'red', 'gray']).isRequired,
    title: PropTypes.any.isRequired,
  };

  export default Buttons;