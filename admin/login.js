const firebaseConfig = {
    apiKey: "AIzaSyCaccr-PTPUKM8ohFgYsbM9aDmP2ffafmc",
    authDomain: "health-monitoring-ad75d.firebaseapp.com",
    projectId: "health-monitoring-ad75d",
    storageBucket: "health-monitoring-ad75d.appspot.com",
    messagingSenderId: "424960953670",
    appId: "1:424960953670:web:563639c4f44f59f0e9e947",
    measurementId: "G-0VS5DNPEWY"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const auth = firebase.auth();
  const database = firebase.database();

  function login(e) {
    e.preventDefault()
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
      alert("Fill in all inputs!")
    }

    auth.signInWithEmailAndPassword(email, password)
    .then(function (userCredential) {
        const user = auth.currentUser;
        const adminRef = database.ref('admin/' + user.uid);

        adminRef.once('value')
            .then((snapshot) => {
                const Data = snapshot.val();
                const access = Data.access;
                if (access) {
                    window.location.href = 'admin.html';
                } else {
                    alert("You can't use a user account on a admin page!");
                }
            })
            .catch(function (error) {
                alert("You can't use a user account on a admin page!");
            })
    })
    .catch(function (error) {
        alert("Incorrect Password or Email!");
    });
  }