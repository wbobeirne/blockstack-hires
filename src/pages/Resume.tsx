import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Loader, Icon, Popup } from 'semantic-ui-react';
import Markdown from 'react-markdown';
import CopyToClipboard from 'react-copy-to-clipboard';
import { fetchResume } from 'ducks/resume/actions';
import { getResume, getUserResume, getIsFetchingResume, getFetchError } from 'ducks/resume/selectors';
import { getUser } from 'ducks/user/selectors';
import { ReduxState } from 'ducks';
import { DEFAULT_PALETTE } from 'utils/constants';
import './Resume.scss';

interface StateProps {
  username: string | null;
  isOwner: boolean;
  resume: ReturnType<typeof getResume>;
  isFetchingResume: ReturnType<typeof getIsFetchingResume>;
  fetchError: ReturnType<typeof getFetchError>;
}

interface ActionProps {
  fetchResume: typeof fetchResume;
}

type Props = StateProps & ActionProps & RouteComponentProps<{ username?: string }>;

class Resume extends React.Component<Props> {
  public componentDidMount() {
    if (!this.props.resume) {
      this.props.fetchResume(this.props.username);
    }
  }

  public render() {
    const { isFetchingResume, fetchError, resume, isOwner, username } = this.props;

    if (isFetchingResume) {
      return <Loader size="massive"/>;
    } else if (fetchError) {
      return (
        <div className="Resume-error">
          <Icon name="exclamation triangle" size="huge"/>
          <h3 className="Resume-error-text">
            {fetchError}
          </h3>
        </div>
      );
    } else if (!resume) {
      return null;
    }

    return (
      <div className="Resume">
        <div className="Resume-header">
          <div className="Resume-header-left">
            <h1 className="Resume-header-left-name">{resume.name}</h1>
            {resume.description &&
              <Markdown className="Resume-header-left-description" source={resume.description}/>
            }
          </div>
          <div className="Resume-header-right">
            {resume.email &&
              <div className="Resume-header-right-contact">
                <Icon name="mail"/> {resume.email}
              </div>
            }
            {resume.phone &&
              <div className="Resume-header-right-contact">
                <Icon name="phone"/> {resume.phone}
              </div>
            }
            {resume.website &&
              <a className="Resume-header-right-contact" href={resume.website} target="_blank">
                <Icon name="globe"/> {resume.website}
              </a>
            }
          </div>
        </div>

        <div className="Resume-content">
          {!!resume.jobs.length &&
            <div className="Resume-main">
              <h2 className="Resume-main-title">Work Experience</h2>
              <div className="Resume-main-items">
                {resume.jobs.map((job, idx) => {
                  const date = `${job.startDate} - ${job.endDate || 'Current'}`;
                  return (
                    <div className={`MainItem ${resume.jobs.length >= 2 && 'has-line'}`} key={idx}>
                      <div className="MainItem-side">
                        <div className="MainItem-side-date">{date}</div>
                      </div>
                      <div className="MainItem-content">
                        <h3 className="MainItem-content-title">{job.company}</h3>
                        <h4 className="MainItem-content-subtitle">{job.position}</h4>
                        <div className="MainItem-content-date">{date}</div>
                        {job.description &&
                          <Markdown className="MainItem-content-description" source={job.description}/>
                        }
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          }

          {!!resume.education.length &&
            <div className="Resume-main">
              <h2 className="Resume-main-title">Education</h2>
              {resume.education.map((edu, idx) => {
                const date = edu.year ? `Graduated ${edu.year}` : 'Currently enrolled';
                return (
                  <div className={`MainItem ${resume.education.length >= 2 && 'has-line'}`} key={idx}>
                    <div className="MainItem-side">
                      <div className="MainItem-side-date">{date}</div>
                    </div>
                    <div className="MainITem-content">
                      <h3 className="MainItem-content-title">{edu.school}</h3>
                      <h4 className="MainItem-content-subtitle">{edu.degree}</h4>
                      <div className="MainItem-content-date">{date}</div>
                      {edu.description &&
                        <Markdown className="MainItem-content-description" source={edu.description}/>
                      }
                    </div>
                  </div>
                );
              })}
            </div>
          }

          {!!resume.skills.length &&
            <div className="Resume-list">
              <h2 className="Resume-list-title">Professional Skills</h2>
              <div className="Resume-list-items">
                {resume.skills.map((skill, idx) => (
                  <div key={idx} className="Resume-list-items-item">{skill}</div>
                ))}
              </div>
            </div>
          }

          {!!resume.interests.length &&
            <div className="Resume-list">
              <h2 className="Resume-list-title">Personal Interests</h2>
              <div className="Resume-list-items">
                {resume.interests.map((interest, idx) => (
                  <div key={idx} className="Resume-list-items-item">{interest}</div>
                ))}
              </div>
            </div>
          }
        </div>

        <div className="Resume-controls">
          {isOwner &&
            <Popup
              on="hover"
              position="left center"
              content="Edit"
              trigger={
                <Link to="/edit" className="Resume-controls-button">
                  <Icon name="pencil"/>
                </Link>
              }
            />
          }

          <Popup
            on="hover"
            position="left center"
            content="Print"
            trigger={
              <button className="Resume-controls-button" onClick={this.print}>
                <Icon name="print"/>
              </button>
            }
          />

          {username ? (
            <Popup
              on="hover"
              position="left center"
              content="Copy URL"
              trigger={
                <CopyToClipboard text={`${window.location.origin}/resume/${username}`}>
                  <button className="Resume-controls-button">
                    <Icon name="linkify"/>
                  </button>
                </CopyToClipboard>
              }
            />
          ) : (
            <Popup
              on="hover"
              position="left center"
              content="Must have a Blockstack ID to generate a shareable URL"
              trigger={
                <button className="Resume-controls-button" disabled>
                  <Icon name="linkify"/>
                </button>
              }
            />
          )}
        </div>

        <style dangerouslySetInnerHTML={{__html: this.makeCssVars() }}/>
      </div>
    );
  }

  public print = () => {
    window.print();
  };

  private makeCssVars() {
    const palette = {
      ...DEFAULT_PALETTE,
      ...this.props.resume!.palette || {}
    };

    return `
      :root {
        ${Object.entries(palette).map(([key, color]) => {
          return `--resume-${key}: ${color};`;
        }).join('\r\n')}
      }
    `;
  }
}

export default connect((state: ReduxState, ownProps: Props): StateProps => {
  const username = ownProps.match.params.username || null;
  let resume;
  let isOwner;

  if (username) {
    resume = getResume(state, username);
    isOwner = getUser(state)!.username === username;
  }
  else {
    resume = getUserResume(state);
    isOwner = true;
  }

  return {
    resume,
    username,
    isOwner,
    isFetchingResume: getIsFetchingResume(state),
    fetchError: getFetchError(state),
  }
}, {
  fetchResume
})(Resume);
