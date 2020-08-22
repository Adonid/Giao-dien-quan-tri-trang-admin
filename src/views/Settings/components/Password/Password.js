import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import clsx from 'clsx';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const schema = {
  password: {
    presence: { allowEmpty: false, message: '^Mật khẩu không để trống' },
    length: {
      maximum: 128,
      message: "^Mật khẩu tối đa 128 ký tự",
      minimum: 6,
      message: "^Mật khẩu tối thiểu 6 ký tự",
    },
    format: {
      pattern: "[a-zA-Z0-9]+",
      flags: "i",
      message: "^Chỉ bao gồm các ký tự số 0-9, chữ thường và hoa a-zA-Z"
    }
  },
  confirm: {
    equality: {
      attribute: "password",
      message: "^Mật khẩu không khớp!",
    },
  },
};

const Password = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const hasError = field => formState.touched[field] && formState.errors[field] ? true : false;

  const handleSubmit = event => {
    event.preventDefault();
    props.updatePassword(formState.values.password);
    setFormState(formState => ({...formState, isValid: false}));
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form onSubmit={ handleSubmit }>
        <CardHeader
          subheader="Cập nhật mật khẩu"
          title="Mật khẩu"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Mật khẩu"
            name="password"
            type="password"
            required
            variant="outlined"
            error={hasError('password')}
            helperText={
              hasError('password') ? formState.errors.password[0] : null
            }
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Xác nhận mật khẩu"
            name="confirm"
            style={{ marginTop: '1rem' }}
            type="password"
            required
            variant="outlined"
            error={hasError('confirm')}
            helperText={
              hasError('confirm') ? formState.errors.confirm[0] : null
            }
            onChange={handleChange}
          />
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="outlined"
            type="submit"
            disabled={!formState.isValid}
          >
            Cập nhật
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
  return {
    prop: state.prop
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updatePassword: pw => {
      dispatch({
        type: "UPDATE_PASSWORD",
        password: pw
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Password)
