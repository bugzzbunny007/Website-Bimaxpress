
var formUrl;


var firebaseConfig = {
    apiKey: "AIzaSyBEAlbpgUOwxMsdKbxCOfrWBUk_x4DgA7s",
    authDomain: "bimaxpress-c08f9.firebaseapp.com",
    projectId: "bimaxpress-c08f9",
    storageBucket: "bimaxpress-c08f9.appspot.com",
    messagingSenderId: "88644167684",
    appId: "1:88644167684:web:7c698778eed5df517dad51",
    measurementId: "G-X07YXTNM1G"
  };

  firebase.initializeApp(firebaseConfig);
  console.log(firebase)

  var firestore = firebase.firestore()

  const db = firestore.collection("Form")

  let submitButton = document.getElementById('submit')

  submitButton.addEventListener("click", (e) => {
      e.preventDefault()


      let name = document.getElementById('name').value
      let mobile = document.getElementById('mobile').value
      let address = document.getElementById('address').value


      db.doc().set({
          name: name,
          mobile: mobile,
          address: address,
          url: formUrl
      }).then(() => {
          console.log("Data Saved")
      }).catch((error) => {
          console.log(error)
      })
  })


  function uploadImage(){
      const ref = firebase.storage().ref().child('Form')

      const file = document.querySelector("#photo").files[0]

      const name = new Date() + '_' + file.name

      const metadata = {
          contentType: file.type

      }

      const task = ref.child(name).put(file, metadata)

      task
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => {
          console.log(url)
          
          
          const image  = document.querySelector('#image')
          image.src = url
          formUrl = url

      })

  }