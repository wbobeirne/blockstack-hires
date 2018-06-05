import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { FieldInfo } from './index';
import SingleField from './SingleField';
import FormField from './FormField';
import './MultiField.scss';

type Props = FieldInfo & {
  onChange(field: FieldInfo, value: any[]): void;
  value: any[];
};

interface State {
  numFields: number;
}

export default class MultiField extends React.PureComponent<Props, State> {
  public state: State = {
    numFields: 0
  };

  public static getDerivedStateFromProps(props: Props, state: State) {
    return {
      ...state,
      numFields: props.value.length || 1,
    };
  }

  public render() {
    const { label, fields, value } = this.props;
    const { numFields } = this.state;
    const FieldComponent = !!fields ? FormField : SingleField;
    const fieldType = !!fields ? 'form' : 'single';
    const defaultValue = !!fields ? {} : '';
    const fieldElements = [];

    for (let i = 0; i < numFields; i++) {
      fieldElements.push(
        <div key={i} className={`MultiField-fields-field is-${fieldType}`}>
          <FieldComponent
            {...this.props}
            hideLabel={true}
            value={value[i] || defaultValue}
            key={i}
            onChange={(_: any, v: any) => this.handleFieldChange(i, v)}
          />
        </div>
      );
    }

    return (
      <div className="MultiField">
        <label className="MultiField-label">{label}</label>
        <div className="MultiField-fields">
          {fieldElements}
        </div>
        <Button positive basic className="MultiField-add" onClick={this.addEntry}>
          <Icon name="plus"/> Add another
        </Button>
      </div>
    );
  }

  private handleFieldChange = (idx: number, value: any) => {
    const newValue = [...this.props.value];
    newValue[idx] = value;

    this.props.onChange(this.props, newValue);
  };

  private addEntry = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    this.setState({ numFields: this.state.numFields + 1 });
  };
}
