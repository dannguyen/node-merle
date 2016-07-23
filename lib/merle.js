import MerlePage from './MerlePage';
import {requestUrl} from './utils';


export default function merle(originalurl){
  requestUrl(originalurl).then(response, content => {
    return new MerlePage(originalurl, content);
  });
}
