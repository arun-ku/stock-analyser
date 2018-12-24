export const MUTUAL_FUND_KEY = '{mutualFund}';
export const TYPE_KEY = '{type}';
export const FROM_DATE_KEY = '{fromDate}';
export const TO_DATE_KEY = '{toDate}';
export const NAV_DATA_URL = `http://portal.amfiindia.com/DownloadNAVHistoryReport_Po.aspx?mf=${MUTUAL_FUND_KEY}&tp=${TYPE_KEY}&frmdt=${FROM_DATE_KEY}&todt=${TO_DATE_KEY}`;
