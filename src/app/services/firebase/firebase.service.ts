import { Injectable, signal } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getFirestore, query, getDocs, collection } from "firebase/firestore";
import { Cinguettio } from '../../model/cinguettio';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  firebaseConfig = {
    apiKey: "AIzaSyBqUokiJNZ1tTJQEwNgZWcWDzc26BCSNnc",
    authDomain: "cinguetto-e634f.firebaseapp.com",
    projectId: "cinguetto-e634f",
    storageBucket: "cinguetto-e634f.firebasestorage.app",
    messagingSenderId: "547429728423",
    appId: "1:547429728423:web:ccac9bfc33f44953e69b82"
  };

  db?: any; //dichiaro il database
  //signal avvisa quando il valore cambia
  //in questo caso avvisa quando l'array di cinguettii cambia
  cinguettii = signal<Cinguettio[]>([]); //dichiaro un array di cinguettii

  constructor() { }

  init() {
    const app = initializeApp(this.firebaseConfig);
    this.db = getFirestore(app);
  }

  async getAllCinguettiii() {
    const newArray: Cinguettio[] = [];

    const querySnapshot = await getDocs(collection(this.db, "cinguettii"));
    querySnapshot.forEach((doc) => {

      const newCinguettio = doc.data() as Cinguettio;

      newCinguettio.id = doc.id;

      newArray.push(newCinguettio);

    });
    this.cinguettii.update(() => newArray); //aggiorno l'array di cinguettii
  }
}
