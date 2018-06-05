import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Button, Loader, Dimmer, Header, Icon, DropdownItemProps } from 'semantic-ui-react';
import {
  getUserResume,
  getIsFetchingResume,
  getFetchError,
  getIsSavingResume,
  getSaveError,
} from 'ducks/resume/selectors';
import { fetchResume, saveResume, saveResumeLocal } from 'ducks/resume/actions';
import { Resume } from 'ducks/resume/types';
import { ReduxState } from 'ducks';
import SingleField from './SingleField';
import MultiField from './MultiField';
import Palette from './Palette';
import { DEFAULT_PALETTE } from 'utils/constants';
import './index.scss';

export interface SubFieldInfo {
  name: string;
  label: string;
  description?: string;
  isRequired?: boolean;
  isTextarea?: boolean;
  options?: DropdownItemProps[];
}

export interface FieldInfo {
  name: keyof Resume;
  label: string;
  description?: string;
  options?: DropdownItemProps[];
  fields?: SubFieldInfo[];
  isRequired?: boolean;
  isMulti?: boolean;
  isTextarea?: boolean;
}

const fields: FieldInfo[] = [{
  name: 'name',
  label: 'Full name',
  isRequired: true,
}, {
  name: 'email',
  label: 'Email',
  description: 'example@mail.com',
  isRequired: true,
}, {
  name: 'location',
  label: 'Location',
  description: 'e.g. Brooklyn, New York',
}, {
  name: 'phone',
  label: 'Phone Number',
  description: 'e.g. (123) 456-7890',
}, {
  name: 'website',
  label: 'Website',
  description: 'e.g. https://mysite.com',
}, {
  name: 'description',
  label: 'Description',
  description: 'Give some extran info about yourself, don’t be afraid to inject some personality!',
  isTextarea: true,
}, {
  name: 'jobs',
  label: 'Work History',
  isMulti: true,
  fields: [{
    name: 'company',
    label: 'Company',
    isRequired: true,
  }, {
    name: 'position',
    label: 'Position',
    isRequired: true,
  }, {
    name: 'startDate',
    label: 'Start date',
    description: 'e.g. 1/23/14',
    isRequired: true
  }, {
    name: 'endDate',
    label: 'End date',
    description: 'e.g. 1/23/14, leave blank if current',
  }, {
    name: 'description',
    label: 'Description',
    description: 'Describe what you worked on',
    isTextarea: true,
  }]
}, {
  name: 'education',
  label: 'Education',
  isMulti: true,
  fields: [{
    name: 'school',
    label: 'School',
    isRequired: true,
  }, {
    name: 'degree',
    label: 'Degree / field of study',
  }, {
    name: 'year',
    label: 'Graduated',
    description: 'e.g. 2017, leave blank if still attending',
    isRequired: true
  }, {
    name: 'gpa',
    label: 'GPA',
    description: 'e.g. 3.9',
  }, {
    name: 'description',
    label: 'Description',
    isTextarea: true,
  }]
}, {
  name: 'skills',
  label: 'Skills',
  isMulti: true,
}, {
  name: 'interests',
  label: 'Interests',
  isMulti: true,
}];

interface StateProps {
  resume: ReturnType<typeof getUserResume>;
  isFetchingResume: ReturnType<typeof getIsFetchingResume>;
  fetchError: ReturnType<typeof getFetchError>;
  isSavingResume: ReturnType<typeof getIsSavingResume>;
  saveError: ReturnType<typeof getSaveError>;
}

interface ActionProps {
  fetchResume: typeof fetchResume;
  saveResume: typeof saveResume;
  saveResumeLocal: typeof saveResumeLocal;
}

type Props = StateProps & ActionProps;

type State = Resume;

function makeInitialState(props: Props): State {
  return {
    jobs: [],
    education: [],
    skills: [],
    interests: [],
    palette: DEFAULT_PALETTE,
    ...JSON.parse(JSON.stringify(props.resume || {}))
  };
}

class ResumeForm extends React.Component<Props, State> {
  public state: State = makeInitialState(this.props);

  public componentDidMount() {
    if (!this.props.resume) {
      this.props.fetchResume();
    }
  }

  public static getDerivedStateFromProps(props: Props, state: State) {
    if (props.resume && !state.name) {
      return makeInitialState(props);
    }
    return state;
  }

  public render() {
    const { isFetchingResume, fetchError, isSavingResume, saveError } = this.props;

    return (
      <Form className="ResumeForm" onSubmit={this.save}>
        {fields.map(field => {
          if (field.isMulti) {
            return <MultiField
              {...field}
              key={field.name}
              value={this.state[field.name] as any[]}
              onChange={this.handleFieldChange}
            />;
          }
          else {
            return <SingleField
              {...field}
              key={field.name}
              value={this.state[field.name] as string}
              onChange={this.handleFieldChange}
            />;
          }
        })}

        <Palette palette={this.state.palette} onChange={this.handleFieldChange}/>

        <div className="ResumeForm-actions">
          <Button size="large" primary loading={isSavingResume}>Save Resume</Button>
          <Link to="/preview">
            <Button size="large" as="div" onClick={this.preview}>Preview</Button>
          </Link>
          <Button basic size="large" negative onClick={this.delete}>Delete</Button>
        </div>

        <Dimmer active={isFetchingResume || !!fetchError || !!saveError} inverted>
          {isFetchingResume &&
            <Loader content="Loading resume..." size="huge"/>
          }
          {(fetchError || saveError) &&
            <Header size="huge" icon>
              <Icon name="exclamation triangle" size="huge"/>
              {fetchError || saveError}
            </Header>
          }
        </Dimmer>
      </Form>
    );
  }

  private handleFieldChange = (field: FieldInfo, value: any) => {
    this.setState({ [field.name as any]: value });
  };

  private save = (ev: React.FormEvent<any>) => {
    ev.preventDefault();
    this.props.saveResume(this.state);
  };

  private preview = () => {
    this.props.saveResumeLocal(this.state);
  };

  private delete = (ev: React.FormEvent<any>) => {
    ev.preventDefault();
  };
}

export default connect((state: ReduxState) => ({
  resume: getUserResume(state),
  isFetchingResume: getIsFetchingResume(state),
  fetchError: getFetchError(state),
  isSavingResume: getIsSavingResume(state),
  saveError: getSaveError(state),
}), {
  fetchResume,
  saveResume,
  saveResumeLocal,
})(ResumeForm);
