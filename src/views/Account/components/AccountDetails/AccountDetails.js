import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import validate from 'validate.js';
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
import { SelectInput } from 'components';

const useStyles = makeStyles(() => ({
  root: {}
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
  const { accountDetail, className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    firstName: 'Shen',
    lastName: 'Zhi',
    email: 'shen.zhi@devias.io',
    phone: '0822737733',
    state: 'Alabama',
    country: 'USA'
  });

  const [formState, setFormState] = useState({
    isValid: false,
    values: {phone: 'mockData.require.phone' , name: 'mockData.require.userName' , email: 'mockData.require.email' },
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
    console.log({required, options});
    // props.updateUser({required, options});
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
  accountDetail: PropTypes.object,
  className: PropTypes.string
};

export default AccountDetails;
