import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import validate from 'validate.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { SelectInput } from 'components';

const useStyles = makeStyles(() => ({
  root: {},
  skeletonDetail: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  skeletonText: {
    position: 'relative',
    width: '100%',
  }
}));

const schema = {
  name: {
      presence: { allowEmpty: false, message: '^Tên người dùng không được trống!' },
      length: {
          minimum: 3,
          message: "^Tối thiểu 3 ký tự!",
        }
  },
  email: {
    presence: { allowEmpty: false, message: 'không để trống!' },
    email: {
      is: true,
      message: "không đúng!",
    },
    length: {
      maximum: 64,
      message: "tối đa 64 ký tự!",
    }
  },
  phone: {
      presence: { allowEmpty: false, message: '^Số điện thoại không để trống' },
      length: {
        is: 10,
        message: "^Số điện thoại phải đúng 10 số!"
      },
      format: {
        pattern: "^(086|096|097|098|032|033|034|035|036|037|038|039|089|090|093|070|079|078|077|076|094|091|088|085|084|083|082|081|092|058|056).[0-9]+",
        flags: "i",
        message: "^Số điện thoại không đúng!"
      }
  }
};

const AccountDetails = props => {
  const { className, updateDetail, mockDataRequire, mockDataOptions,  ...rest } = props;

  const classes = useStyles();

  const [ isData, setIsData ] = useState(false);

  const [formState, setFormState] = useState({
    isValid: false,
    values: {phone: mockDataRequire.phone , name: mockDataRequire.userName , email: mockDataRequire.email },
    touched: {},
    errors: {}
  });

  const [formOptions, setFormOptions] = useState({
    province: 0,
    district: 0,
    commune: 0,
    street: ""
  });

  const [ listProvince, setListProvince ] = useState([{value: 0, label: "Tỉnh/thành phố"}]);
  const [ listDistrict, setListDistrict ] = useState([{value: 0, label: "Quận/huyện"}]);
  const [ listCommune, setListCommune ] = useState([{value: 0, label: "Phường/xã"}]);

  const [ disableDistrict, setDisableDistrict ] = useState(true);
  const [ disableCommune, setDisableCommune ] = useState(true);
  const [ disableStreet, setDisableStreet ] = useState(true);

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
  }

  const handleChangeSwitch = event => setEmailVerify(event.target.checked);

  const hasError = field => formState.touched[field] && formState.errors[field] ? true : false;

  const states = [
    {
      value: 'alabama',
      label: 'Alabama'
    },
    {
      value: 'new-york',
      label: 'New York'
    },
    {
      value: 'san-francisco',
      label: 'San Francisco'
    }
  ];

  const getProvince = val => setFormOptions( formOptions => ({...formOptions, province: val}));
  const getDistrict = val => setFormOptions( formOptions => ({...formOptions, district: val}));
  const getCommune = val => setFormOptions( formOptions => ({...formOptions, commune: val}));

  const handleStreet = event => {
    event.persist();
    setFormOptions( formOptions => ({...formOptions, street: event.target.value}));
    };

  const handleSubmit = event => {
    event.preventDefault();
    const required = formState.values;
    const options = formOptions;
    props.updateDetail({required, options});
  }

  if(isData){
    return (
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <CardHeader
          title={<Skeleton animation="wave" style={{ marginBottom: 5 }} width="20%" />}
          subheader={<Skeleton animation="wave" height={10} width="40%" />}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={5} >
            <Grid item xs={12} sm={6}>
              <Skeleton animation="wave" style={{ marginBottom: 15 }} width="100%" />
              <Skeleton animation="wave" width="100%" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Skeleton animation="wave" style={{ marginBottom: 15 }} width="100%" />
              <Skeleton animation="wave" width="100%" />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        onSubmit={ handleSubmit }
      >
        <CardHeader
          subheader="Thông tin cơ bản của người dùng"
          title="Hồ sơ"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="Họ tên"
                margin="dense"
                name="name"
                required
                variant="outlined"
                defaultValue={ mockDataRequire.userName }
                onChange={handleChange}
                error={hasError('name')}
                helperText={
                    hasError('name') ? formState.errors.name[0] : null
                }
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email"
                margin="dense"
                name="email"
                required
                variant="outlined"
                defaultValue={ mockDataRequire.email }
                onChange={handleChange}
                error={hasError('email')}
                helperText={
                    hasError('email') ? formState.errors.email[0] : null
                }
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Số điện thoại"
                margin="dense"
                name="phone"
                type="number"
                required
                variant="outlined"
                defaultValue={ mockDataRequire.phone }
                onChange={handleChange}
                error={hasError('phone')}
                helperText={
                    hasError('phone') ? formState.errors.phone[0] : null
                }
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <SelectInput list={listProvince} fullWidth={true} margin="dense" action={ getProvince } label="Tỉnh/thành phố" />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <SelectInput list={states} fullWidth={true} disable={disableDistrict} margin="dense" action={ getDistrict } label="Quận/huyện" />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <SelectInput list={states} fullWidth={true} disable={disableCommune} margin="dense" action={ getCommune } label="Phường/xã" />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Số nhà/đường/thôn/xóm"
                margin="dense"
                name="street"
                variant="outlined"
                disabled={disableStreet}
                onChange={ handleStreet }
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={!formState.isValid}
          >
            Save details
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string,
  updateDetail: PropTypes.func.isRequired,
  mockDataRequire: PropTypes.object.isRequired,
  mockDataOptions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    mockDataRequire: state.dataUserEditor.dataUser.require,
    mockDataOptions: state.dataUserEditor.dataUser.options,
});

const mapDispatchToProps = dispatch => ({
  updateDetail: data => dispatch({type: "UPDATE_PROFILE",data: data}),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetails)
