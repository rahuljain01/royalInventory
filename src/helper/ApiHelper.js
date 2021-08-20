import axios from 'axios'
import {config} from '../config/Config'

export const getCall = (path, headers) => {

    return new Promise((resolve, reject) => {
        axios.get(config.baseUrl + path, headers
            ).then(function (responseArr) {
              console.log('SUCCESS!!');
              resolve(responseArr.data.data)
            })
            .catch(function (reason) {
              console.log('FAILURE!!');
              reject(reason)
            });
     });
    
}

export const postCall = (path, data) => {

    return new Promise((resolve, reject) => {
        axios.post(config.baseUrl + path, data, {
          headers:{'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json', 'mode':'cors'}
        }
            ).then(function (responseArr) {
              console.log('SUCCESS!!');
              resolve(responseArr.data.data)
            })
            .catch(function (reason) {
              console.log('FAILURE!!');
              reject(reason)
            });
        });
    
}

export const putCall = (path, data) => {

  return new Promise((resolve, reject) => {
      axios.put(config.baseUrl + path, data
          ).then(function (responseArr) {
            console.log('SUCCESS!!');
            resolve(responseArr.data.data)
          })
          .catch(function (reason) {
            console.log('FAILURE!!');
            reject(reason)
          });
      });
  
}

const header = () => {
  return {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json', 'mode':'cors'}
}