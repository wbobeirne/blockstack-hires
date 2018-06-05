import React from 'react';
import { connect } from 'react-redux';
import { getUser } from 'ducks/user/selectors';
import { ReduxState } from 'ducks';
import ResumeForm from 'components/ResumeForm';
import './EditResume.scss';

interface StateProps {
  user: ReturnType<typeof getUser>;
}

type Props = StateProps;

class EditResume extends React.Component<Props> {
  public render() {
    const { user } = this.props;

    return (
      <div className="EditResume">
        <h1 className="EditResume-title">
          Let's Get Started, {user.username}
        </h1>
        <p className="EditResume-description">
          Fill out as much information as you’d like, only the fields marked
          with <span className="EditResume-description-required">*</span> are required.
        </p>

        <ResumeForm/>
      </div>
    );
  }
}

export default connect((state: ReduxState) => ({
  user: getUser(state)
}))(EditResume);
