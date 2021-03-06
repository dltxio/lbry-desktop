import { connect } from 'react-redux';
import { doClearEmailEntry, doUserFetch } from 'lbryinc';
import { doToast } from 'lbry-redux';
import UserSignIn from './view';

const select = state => ({
  // passwordSetSuccess: selectPasswordSetSuccess(state),
  // passwordSetIsPending: selectPasswordSetIsPending(state),
  // passwordSetError: selectPasswordSetError(state),
});

export default connect(select, {
  doToast,
  doClearEmailEntry,
  doUserFetch,
})(UserSignIn);
