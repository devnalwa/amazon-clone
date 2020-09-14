import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-clone-f2299.cloudfunctions.net/api" // The API (cloud function) URL
  // "http://localhost:5001/clone-f2299/us-central1/api" -> Local Host , good for debugging purposes
});

export default instance;
