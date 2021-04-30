import React from 'react';
import Creatable from 'react-select/creatable';

const options = [
    { value: 'Food', label: 'Food' },
    { value: 'Being Fabulous', label: 'Being Fabulous' },
    { value: 'Ken Wheeler', label: 'Ken Wheeler' },
    { value: 'ReasonML', label: 'ReasonML' },
    { value: 'Unicorns', label: 'Unicorns' },
    { value: 'Kittens', label: 'Kittens' },
  ];

class RCreatable extends React.Component {
    handleChange = value => {
      // this is going to call setFieldValue and manually update values.topcis
      this.props.onChange('category', value);
    };
  
    handleBlur = () => {
      // this is going to call setFieldTouched and manually update touched.topcis
      this.props.onBlur('category', true);
    };
  
    render() {
      return (
        <div style={{ margin: '1rem 0 1rem 20rem', width: '1000px' }}>
          <Creatable
            id="color"
            options={options}
            multi={true}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            value={this.props.value}
          />
          {!!this.props.error &&
            this.props.touched && (
              <div style={{ color: 'red', marginTop: '.5rem' }}>{this.props.error}</div>
            )}
        </div>
      );
    }
  }

  export default RCreatable;