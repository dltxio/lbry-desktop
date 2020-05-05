import { connect } from 'react-redux';
import {
  makeSelectSearchDownloadUrlsForPage,
  makeSelectSearchDownloadUrlsCount,
  selectDownloadUrlsCount,
  selectIsFetchingFileList,
  doPurchaseList,
  selectMyPurchases,
  selectFetchingMyPurchases,
} from 'lbry-redux';
import FileListDownloaded from './view';
import { withRouter } from 'react-router';

const select = (state, props) => {
  const { history, location } = props;
  const { search } = location;
  const urlParams = new URLSearchParams(search);
  const query = urlParams.get('query') || '';
  const page = Number(urlParams.get('page')) || 1;
  return {
    page,
    history,
    query,
    allDownloadedUrlsCount: selectDownloadUrlsCount(state),
    downloadedUrls: makeSelectSearchDownloadUrlsForPage(query, page)(state),
    downloadedUrlsCount: makeSelectSearchDownloadUrlsCount(query)(state),
    fetchingFileList: selectIsFetchingFileList(state),
    myPurchases: selectMyPurchases(state),
    fetchingMyPurchases: selectFetchingMyPurchases(state),
  };
};

export default withRouter(
  connect(select, {
    doPurchaseList,
  })(FileListDownloaded)
);
