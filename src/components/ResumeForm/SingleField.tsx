import React from 'react';
import { Input, Select, TextArea } from 'semantic-ui-react';
import { FieldInfo, SubFieldInfo } from './index';
import './SingleField.scss';

type Props = (FieldInfo | SubFieldInfo) & {
  hideLabel?: boolean;
  onChange(field: FieldInfo | SubFieldInfo, value: string): void;
  value: string;
};

export default class SingleField extends React.PureComponent<Props> {
  public render() {
    const { value, label, hideLabel, description, options, isTextarea, isRequired } = this.props;

    return (
      <div className="SingleField">
        {!hideLabel && label &&
          <label className="SingleField-label">
            {label}
            {isRequired && <span className="SingleField-label-required">*</span>}
          </label>
        }
        {options ? (
          <Select
            fluid
            value={value}
            placeholder={description}
            options={options}
            onChange={this.handleChange}
          />
        ) : isTextarea ? (
          <TextArea
            fluid
            value={value}
            placeholder={description}
            onChange={this.handleChange}
          />
        ) : (
          <Input
            fluid
            value={value}
            placeholder={description}
            onChange={this.handleChange}
          />
        )}
      </div>
    );
  }

  private handleChange = (ev: React.FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    this.props.onChange(this.props, ev.currentTarget.value);
  };
}
