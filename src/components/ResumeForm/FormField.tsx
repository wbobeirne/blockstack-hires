import React from 'react';
import { FieldInfo, SubFieldInfo } from './index';
import SingleField from './SingleField';
import './FormField.scss';

type Props = FieldInfo & {
  onChange(field: FieldInfo, value: any): void;
  value: any;
};

export default class FormField extends React.PureComponent<Props> {
  public render() {
    const { fields, value } = this.props;

    return (
      <div className="FormField">
        {fields.map(field => (
          <SingleField
            {...field}
            key={field.name}
            value={value[field.name]}
            onChange={this.handleFieldChange}
          />
        ))}
      </div>
    );
  }

  private handleFieldChange = (field: SubFieldInfo, value: string) => {
    const newValue = {
      ...this.props.value,
      [field.name]: value,
    };
    this.props.onChange(this.props, newValue);
  };
}
