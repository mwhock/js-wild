
// navigator.geolocation.getCurrentPosition(onGeolocationSuccess, onGeolocationError)
// // console.log("hello")

// class FlickGallery {
//     constructor(myLocation) {
//         this.term = "landmark" //this specifies picture tag "category" from Flickr
//         this.location = myLocation //mylocation was named location
//         // consider createElement in JS for next line ??
//         this.container = document.getElementById("photoContainer") // holder for photos on page
//         this.page = 1
//         this.perPage = 5   
//         this.currentPhotoIndex = 0
//         this.photos = []            // creates empty array to store photos
//         this.isLoading = false      // no pics until fetch?? fulfilled
//         // following line creates user button which when pressed, executes displayNextPhoto 
//         document.getElementById('next').addEventListener('click', this.displayNextPhoto.bind(this))
//     }

//     startSlideShow() {          //never called so hide or delete??
//         setInterval(this.displayNextPhoto.bind(this), 1000)
//     }

//     displayNextPhoto() {        //if photo loaded, user may advance via button
//         if (this.isLoading) {
//             return;
//         };
//         // if the data is being loaded, disable the button:
//         console.log("will display next photo")
//         this.currentPhotoIndex += 1

//         if (this.currentPhotoIndex < this.photos.length) {
//             let photoObject = this.photos[this.currentPhotoIndex]
//             this.displayPhotoObject(photoObject)
//         } else {
//             console.log("fetching another page of photos from Flickr")
//             this.page += 1
//             this.currentPhotoIndex = 0
//             this.fetchDataFromFlickr()
//         }
//     }

//     displayPhotoObject(photoObj) {
//         let imageUrl = this.constructImageURL(photoObj);
//         let img = document.createElement('img')
//         img.src = imageUrl
//         this.container.innerHTML = '' //??
//         this.container.append(img) // adds to array of photos
//     }

//     processFlickrResponse(parsedResponse) {     //??
//         this.setLoading(false)
//         console.log(parsedResponse)
//         this.photos = parsedResponse.photos.photo
//         if (this.photos.length > 0) {
//             let firstPhotoObject = this.photos[this.currentPhotoIndex]
//             this.displayPhotoObject(firstPhotoObject)
//         } else {
//             this.container.innerHTML = 'No more pictures'
//         }
//     }

//     setLoading(isLoading) {
//         let loadingSpan = document.getElementById('loading') //??
//         if (isLoading) {
//             this.isLoading = true
//             loadingSpan.innerHTML = 'Loading please wait'
//         } else {
//             this.isLoading = false
//             loadingSpan.innerHTML = ''
//         }
//     }

//     fetchDataFromFlickr() {   //function called from onGeolocationSuccess once API returns vacation 
//         let url = this.generateApiUrl();
//         let fetchPromise = fetch(url);
//         this.setLoading(true);
//         fetchPromise
//             .then(response => response.json())
//             .then(parsedResponse => this.processFlickrResponse(parsedResponse));
//     };

//     generateApiUrl() {   //many of properties below as specified in API??
//         return 'https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/' +
//             '?api_key=eea38ed7a25085f6385473a6a8147e82' + //my personal key from API
//             '&format=json' +
//             '&nojsoncallback=1' +
//             '&method=flickr.photos.search' + 
//             '&safe_search=1' +
//             '&per_page=' + this.perPage +
//             '&page=' + this.page +
//             '&text=' + this.term +
//             '&lat=' + this.location.latitude +
//             '&lon=' + this.location.longitude +
//     }

//     constructImageURL(photoObj) {
//         return "https://farm" + photoObj.farm +
//                 ".staticflickr.com/" + photoObj.server +
//                 "/" + photoObj.id + "_" + photoObj.secret + ".jpg";
//     }
// }

// let latitude = "";      //??
// let longitude = "";     //??
// function onGeolocationSuccess(data) { //data is object from geoLocation
//     console.log(data);
//     let currentLocation = data.coords;  // coords is property of object
//     let gallery = new FlickGallery(currentLocation);
//     gallery.fetchDataFromFlickr();
// };

// // lat=2.3522&lon=48.856 ??
// function onGeolocationError() {
//     const fallbackLocation = { latitude: 46.0857, longitude: 14.59964 } // Slovenia
//     let gallery = new FlickGallery(fallbackLocation) //create fallbackLoc object
//     gallery.fetchDataFromFlickr() 
// }

