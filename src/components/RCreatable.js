import React from 'react';
import Creatable from 'react-select/creatable';



class RCreatable extends React.Component {
    handleChange = value => {
      // this is going to call setFieldValue and manually update values.topcis
      this.props.onChange(this.props.name, value);
    };
  
    handleBlur = () => {
      // this is going to call setFieldTouched and manually update touched.topcis
      this.props.onBlur(this.props.name, true);
    };

    render() {
      return (
        <div style={{ width: this.props.width ? this.props.width: '100%',margin: 'auto'}}>
          <Creatable
            id="color"
            options={this.props.options}
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