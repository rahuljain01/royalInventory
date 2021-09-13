import axios from 'axios'
import {config} from '../config/Config'
import { showMessage } from '../components/Alert/AlertPopup'
import authHeader from '../store/auth-header';

export const getCall = (path,headers, showFailureMessage = false) => {

  
  let mergedHeader

  if (headers) {
    mergedHeader = {...headers,...{headers:header}}
  } else {
    mergedHeader = {headers:header}
  }
    return new Promise((resolve, reject) => {
        axios.get(config.baseUrl + path, mergedHeader
            ).then(function (responseArr) {
              resolve(responseArr.data.data)
            })
            .catch(function (reason) {
              if (showFailureMessage) {
                showMessage("Oops!",
                "Something went wrong",
                "error",
                "Ok")
              }
              reject(reason)
            });
     });
    
}

export const postCall = (path, data, showFailureMessage = false) => {

    return new Promise((resolve, reject) => {
        axios.post(config.baseUrl + path, data, {headers:header}
            ).then(function (responseArr) {
              console.log('SUCCESS!!');
              resolve(responseArr.data)
            })
            .catch(function (reason) {
              if (showFailureMessage) {
                showMessage("Oops!",
                "Something went wrong",
                "error",
                "Ok")
              }
              reject(reason)
            });
        });
    
}

export const putCall = (path, data,  showFailureMessage = false, configs = {}) => {

  let mergedHeader

  if (configs) {
    mergedHeader = {...configs,...{headers:header}}
  } else {
    mergedHeader = {headers:header}
  }

  return new Promise((resolve, reject) => {
      axios.put(config.baseUrl + path, data, mergedHeader
          ).then(function (responseArr) {
            console.log('SUCCESS!!');
            resolve(responseArr.data.data)
          })
          .catch(function (reason) {
            if (showFailureMessage) {
              showMessage("Oops!",
              "Something went wrong",
              "error",
              "Ok")
            }
            reject(reason)
          });
      });
  
}

const header = {...{'Content-Type': 'application/json'}, ...authHeader()}