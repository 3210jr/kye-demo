// @ts-check
import { init } from "@rematch/core";
import firebase from "firebase";
import * as models from "./models";

const store = init({
	models
});

export default store;




// Listen to profile changes!
let profileListener;
function resetProfileListener() {
	if (profileListener) {
		profileListener();
	}
}
firebase.auth().onAuthStateChanged(user => {
	resetProfileListener();
	if (user) {
		profileListener = firebase
			.firestore()
			.collection("profiles")
			.doc(user.uid)
			.onSnapshot(snap => {
				if (snap.exists) {
                    store.dispatch.profile.setProfile(snap.data());
                } else {
                    store.dispatch.profile.clearProfile();
                }
				// snap.docs
			});
	} else {
        store.dispatch.profile.clearProfile();
	}
});

