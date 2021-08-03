// To run this assignment, right click on index.html in the Visual Studio file explorer to the left
// and select "Open with Live Server"

// Your Code Here.

// code basis was Seva's walk-through
class FlickGallery {
  constructor(currentLocation) {
      this.term = 'dogs'          //this specifies picture tag "category" from Flickr
      this.currentLocation = currentLocation  //this was changed to avoid JS keyword location
      // consider createElement in JS for next line ??    
      // HTML builds holder for photos on page:
      this.container = document.getElementById('photoContainer')  
      this.page = 1
      this.perPage = 5
      this.currentPhotoIndex = 0
      this.photos = []            // creates empty array to store photos
      this.isLoading = false      // boolean for picture retrieve
      // following line - HTML creates user button which when pressed, calls displayNextPhoto 
      // consider createElement in JS for next line ??
      document.getElementById('next').addEventListener('click', this.displayNextPhoto.bind(this)) //build HTML??
  }

  displayNextPhoto() {        //if photo loaded, user may advance via button
    if (this.isLoading) {
        return;
    };
    this.currentPhotoIndex += 1;
    if (this.currentPhotoIndex < this.photos.length) {
      let photoObject = this.photos[this.currentPhotoIndex];
      this.displayPhotoObject(photoObject);
    } else {
      this.page += 1;
      this.currentPhotoIndex = 0;
      this.fetchDataFromFlickr();
    }
  }

  fetchDataFromFlickr() {
    let url = this.findApiUrl();    // calls method below
    console.log(url);
    let fetchPromise = fetch(url);  // fetch request
    this.setLoading(true);  //calls method below to update isLoading boolean
    fetchPromise  //lines 48-50 are "one line"; once promise fulfilled:
        .then(response => response.json())  //response string ??
        .then(parsedResponse => this.processFlickrResponse(parsedResponse));
  }

  findApiUrl() {      //called to build URL from fetchDataFromFlickr above
    return 'https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/' +
        '?api_key=eea38ed7a25085f6385473a6a8147e82' +
        '&format=json' +
        '&nojsoncallback=1' +
        '&method=flickr.photos.search' + 
        '&safe_search=1' +
        '&per_page=' + this.perPage + 
        '&page=' + this.page + 
        '&text=' + this.term + 
        '&lat=' + this.currentLocation.latitude +
        '&lon=' + this.currentLocation.longitude +
        '&text=dogs'; 
  }

  processFlickrResponse(parsedResponse) {
    this.setLoading(false);
    this.photos = parsedResponse.photos.photo
    if (this.photos.length > 0) {
        let firstPhotoObject = this.photos[this.currentPhotoIndex]
        this.displayPhotoObject(firstPhotoObject)
    } else {
        this.container.innerHTML = 'There are no more pictures.'
    };
  }

  displayPhotoObject(photoObj) {
    let imageUrl = this.constructImageURL(photoObj);
    let img = document.createElement('img');
    img.src = imageUrl;
    this.container.innerHTML = '';
    this.container.append(img);
  }

  constructImageURL(photoObj) {
    return "https://farm" + photoObj.farm +
            ".staticflickr.com/" + photoObj.server +
            "/" + photoObj.id + "_" + photoObj.secret + ".jpg";
  }
    
  setLoading(isLoading) {  
    let loadingSpan = document.getElementById('loading');
    if (isLoading) {
        this.isLoading = true;
        loadingSpan.innerHTML = 'Loading please wait';
    } else {
        this.isLoading = false;
        loadingSpan.innerHTML = '';
    };
  }
}

function onGetGeolocationSuccess(dataPosition) { //API returns GeolocationPosition object as sole input
  currentLocation = dataPosition.coords;
  latitude = currentLocation.latitude;
  longitude = currentLocation.longitude; 
};

function onGetGeolocationError() {
  // not a coding question, but research why latitude and longitude differ from GPS coordinates.
  let alternativeLocation = {   // array object because we have to get 2 properties
    latitude: 46.056946,
    longitude: 14.505751
  }; 
  let gallery = new FlickGallery(alternativeLocation);
  gallery.fetchDataFromFlickr();
};

// navigator.geolocation.clearWatch() - necessary to use?? how to use?
// watch for location changes:  
function updatedLocation() {  
  console.log("now checking for location changes"); //needs to write to DOM??
  navigator.geolocation.watchPosition(onGetGeolocationSuccess, onGetGeolocationError);  
};

// below is the first code executed synchrnously:

let currentLocation = {};

if('geolocation' in navigator) {
  /* geolocation is available */
  navigator.geolocation.getCurrentPosition(onGetGeolocationSuccess, onGetGeolocationError);
} else {
  /* geolocation IS NOT available */
  onGetGeolocationError;
}

// code basis was Seva's walk-through