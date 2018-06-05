import React from 'react';
import { SketchPicker, ColorResult } from 'react-color';
import { Resume } from 'ducks/resume/types';
import { FieldInfo } from './index';
import './Palette.scss';

const paletteColors: {
  key: keyof Resume['palette'];
  title: string;
}[] = [{
  key: 'bg',
  title: 'Background',
}, {
  key: 'text',
  title: 'Text'
}, {
  key: 'headerBg',
  title: 'Header BG',
}, {
  key: 'headerText',
  title: 'Header text',
}, {
  key: 'timeline',
  title: 'Timeline',
}, {
  key: 'listBg',
  title: 'List block BG',
}, {
  key: 'listText',
  title: 'List block text'
}];

interface Props {
  palette: Resume['palette'];
  onChange(field: FieldInfo, value: any): void;
}

interface State {
  openColor: string | null;
}

export default class Palette extends React.Component<Props, State> {
  public state: State = {
    openColor: null
  };

  private paletteEl: HTMLDivElement;

  public componentDidMount() {
    document.body.addEventListener('click', this.closeColor);
  }

  public componentWillUnmount() {
    document.body.removeEventListener('click', this.closeColor);
  }

  public render() {
    const { palette } = this.props;
    const { openColor } = this.state;
    return (
      <div className="Palette" ref={(el) => this.paletteEl = el}>
        <div className="Palette-title">Colors</div>
        {paletteColors.map(color => (
          <div className="Palette-color" key={color.key}>
            <div className="Palette-color-name">{color.title}</div>
            <div className="Palette-color-pill" onClick={() => this.toggleColor(color.key)}>
              <div className="Palette-color-pill-block" style={{ background: palette[color.key] }}/>
              <div className="Palette-color-pill-hex">
                {palette[color.key]}
              </div>
            </div>
            <div className={`Palette-color-picker ${openColor === color.key && 'is-open'}`}>
              <SketchPicker
                color={palette[color.key]}
                onChange={(c) => this.handleChangeColor(color.key, c)}
                disableAlpha
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  private toggleColor = (color: string) => {
    this.setState({ openColor: color === this.state.openColor ? null : color })
  };

  private closeColor = (ev: MouseEvent) => {
    const target = ev.target as HTMLElement;
    if (target.parentNode === this.paletteEl || this.paletteEl.contains(target.parentNode)) {
      return;
    }
    this.setState({ openColor: null });
  };

  private handleChangeColor = (key: string, color: ColorResult) => {
    this.props.onChange({
      name: 'palette',
      label: 'Colors',
    }, {
      ...this.props.palette,
      [key]: color.hex.toUpperCase(),
    });
  };
}
