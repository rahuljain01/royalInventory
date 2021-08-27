import axios from 'axios'
import {config} from '../config/Config'
import { showMessage } from '../components/Alert/AlertPopup'

export const getCall = (path, headers, showFailureMessage = false) => {

    return new Promise((resolve, reject) => {
        axios.get(config.baseUrl + path, headers
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
        axios.post(config.baseUrl + path, data, {
          headers:{'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json', 'mode':'cors'}
        }
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

export const putCall = (path, data, showFailureMessage = false) => {

  return new Promise((resolve, reject) => {
      axios.put(config.baseUrl + path, data
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

const header = () => {
  return {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json', 'mode':'cors'}
}