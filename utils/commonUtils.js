import {parse as parseQueryString} from 'query-string';
import moment from 'moment';

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
}