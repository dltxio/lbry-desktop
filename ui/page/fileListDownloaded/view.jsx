// @flow
import * as ICONS from 'constants/icons';
import React, { useState } from 'react';
import Button from 'component/button';
import ClaimList from 'component/claimList';
import Paginate from 'component/common/paginate';
import { PAGE_SIZE } from 'constants/claim';
import { Form } from 'component/common/form-components/form';
import Icon from 'component/common/icon';
import { FormField } from 'component/common/form-components/form-field';
import { withRouter } from 'react-router';
import Card from 'component/common/card';
import Page from 'component/page';
import { Lbry } from 'lbry-redux';
import classnames from 'classnames';
import Spinner from 'component/spinner';

type Props = {
  fetchingFileList: boolean,
  allDownloadedUrlsCount: number,
  downloadedUrls: Array<string>,
  downloadedUrlsCount: ?number,
  history: { replace: string => void },
  page: number,
  query: string,
};

const VIEW_DOWNLOADS = 'view_download';
const VIEW_PURCHASES = 'view_purchases';

function FileListDownloaded(props: Props) {
  const {
    history,
    query,
    allDownloadedUrlsCount,
    downloadedUrls,
    downloadedUrlsCount,
    doPurchaseList,
    myPurchases,
    fetchingMyPurchases,
    fetchingFileList,
  } = props;
  const hasDownloads = allDownloadedUrlsCount > 0 || (myPurchases && myPurchases.length);
  const loading = fetchingFileList || fetchingMyPurchases;
  const [viewMode, setViewMode] = React.useState(VIEW_PURCHASES);
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([]);

  function handleInputChange(e) {
    const { value } = e.target;
    if (value !== searchQuery) {
      setSearchQuery(value);
      history.replace(`?query=${value}&page=1`);
    }
  }

  React.useEffect(() => {
    doPurchaseList();
  }, []);
  console.log('?', myPurchases);

  return (
    <React.Fragment>
      {loading && !hasDownloads && (
        <div className="main--empty">
          <Spinner delayed />
        </div>
      )}

      {!loading && !hasDownloads && (
        <div className="main--empty">
          <section className="card card--section">
            <h2 className="card__title card__title--deprecated">
              {__("You haven't downloaded anything from LBRY yet.")}
            </h2>
            <div className="card__actions card__actions--center">
              <Button button="primary" navigate="/" label={__('Explore new content')} />
            </div>
          </section>
        </div>
      )}

      {hasDownloads && (
        <Card
          title={
            <div>
              <Button
                icon={ICONS.LIBRARY}
                button="alt"
                className={classnames(`button-toggle`, {
                  'button-toggle--active': viewMode === VIEW_DOWNLOADS,
                })}
                label={__('All Downloads')}
              />
              <Button
                icon={ICONS.PURCHASED}
                button="alt"
                className={classnames(`button-toggle`, {
                  'button-toggle--active': viewMode === VIEW_PURCHASES,
                })}
                label={__('Your Purchases')}
              />
            </div>
          }
          titleActions={
            <div className="card__actions--inline">
              <Form onSubmit={() => {}} className="wunderbar--inline">
                <Icon icon={ICONS.SEARCH} />
                <FormField
                  className="wunderbar__input"
                  onChange={handleInputChange}
                  value={query}
                  type="text"
                  name="query"
                  placeholder={__('Search')}
                />
              </Form>
            </div>
          }
          isBodyList
          body={
            <div>
              <ClaimList
                isCardBody
                persistedStorageKey="claim-list-downloaded"
                empty={__('No results for %query%', { query })}
                uris={'viewMode === VIEW_PURCHASES' ? myPurchases : downloadedUrls}
                loading={loading}
              />
              {/* <Paginate totalPages={Math.ceil(Number(downloadedUrlsCount) / Number(PAGE_SIZE))} loading={fetching} /> */}
            </div>
          }
        />
      )}
    </React.Fragment>
  );
}

export default withRouter(FileListDownloaded);
