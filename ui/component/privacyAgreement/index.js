import { connect } from 'react-redux';
import { doSetDaemonSetting } from 'redux/actions/settings';
import { doSetWelcomeVersion, doToggle3PAnalytics, doSignOut } from 'redux/actions/app';
import { DAEMON_SETTINGS } from 'lbry-redux';
import { WELCOME_VERSION } from 'config.js';
import { selectUserVerifiedEmail } from 'lbryinc';
import PrivacyAgreement from './view';

const select = state => ({
  authenticated: selectUserVerifiedEmail(state),
});

const perform = dispatch => ({
  setWelcomeVersion: version => dispatch(doSetWelcomeVersion(version || WELCOME_VERSION)),
  setShareDataInternal: share => dispatch(doSetDaemonSetting(DAEMON_SETTINGS.SHARE_USAGE_DATA, share)),
  setShareDataThirdParty: share => dispatch(doToggle3PAnalytics(share)),
  signOut: () => dispatch(doSignOut()),
});

export default connect(
  select,
  perform
)(PrivacyAgreement);
