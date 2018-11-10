import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { 

  }

  getLocalStorageByKey(key){
    return localStorage.getItem(key);
  }
  setLocalStorageByKey(key, val){
    localStorage.setItem(key, val);
  }
  removeLocalStorageByKey(key){
    localStorage.removeItem(key);
  }
}
