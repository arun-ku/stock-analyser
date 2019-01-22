import {parse as parseQueryString} from 'query-string';
import moment from 'moment';

import {
  MUTUAL_FUND_KEY,
  TYPE_KEY,
  FROM_DATE_KEY,
  TO_DATE_KEY,
  NAV_DATA_URL,
} from '../server/constants/apiConstants';

export const getParsedQueryStringObject = (url) => {
  let parsedQueryString = parseQueryString(url);
  if(Object.keys(parsedQueryString).length == 0){
    return null;
  }

  return parsedQueryString;
};

export const generateRandomId = () => {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  [...new Array(8)].forEach(() => {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  });
  return text;
};

export const createUrlForNDays = (url, days) => {
  let date = new Date();
  date.setDate(date.getDate() - (days));
  const d300 = moment(new Date(date)).format('DD-MMM-YYYY');
  const d = moment(new Date()).format('DD-MMM-YYYY');
  const queryParams = getParsedQueryStringObject(url.split('?')[1]);
  let plainUrl = url.split('?')[0];
  queryParams.frmdt = d300;
  queryParams.todt = d;
  plainUrl += '?';
  Object.keys(queryParams).forEach(key => {
    plainUrl += `${key}=${queryParams[key]}&`
  });
  plainUrl += 'na=1';

  return plainUrl;
};

export const getHistoryFetchingUrl = (params) => {
  const {
    mutualFund,
    type,
    fromDate,
    toDate,
  } = params;

  return (
    NAV_DATA_URL
      .replace(MUTUAL_FUND_KEY, mutualFund)
      .replace(TYPE_KEY, type)
      .replace(FROM_DATE_KEY, fromDate)
      .replace(TO_DATE_KEY, toDate)
  );
};

export const mfNameFetchingUrl = (params) => {
  const {
    mutualFund,
    type,
    fromDate,
    toDate,
  } = params;

  return (
    NAV_DATA_URL
      .replace(MUTUAL_FUND_KEY, mutualFund)
      .replace(TYPE_KEY, type)
      .replace(FROM_DATE_KEY, fromDate)
      .replace(TO_DATE_KEY, toDate)
  );
};

export const getPlainUrl = (mf, mft) => {
  return `http://portal.amfiindia.com/DownloadNAVHistoryReport_Po.aspx?mf=${mf}&tp=${mft}`
};