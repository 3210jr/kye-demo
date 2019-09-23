// @ts-check
import firebase from "./firebase";
import uuidV1 from "uuid/v1";

export function uploadFile(file, folder) {
	if (!folder) {
		throw new Error("You must specify what folder to upload the file in!");
	}
	const fileName = uuidV1() + "___" + file.name;
	const storageRef = firebase.storage().ref(`${folder}/`);
	return storageRef.child(fileName).put(file);
}

export function createOrder({
	firstName,
	lastName,
	middleName,
	dateOfBirth,
	address,
	gender,
	screeningTypes,
	assetsURL,
	organizationId,
	organizationName
}) {
	const serverTime = firebase.firestore.FieldValue.serverTimestamp();
	const user = firebase.auth().currentUser;
	if (!user) {
		throw new Error("You must be registered to create an order!");
	}

	return firebase
		.firestore()
		.collection("orders")
		.add({
			firstName,
			lastName,
			middleName,
			dateOfBirth,
			address,
			gender,
			screeningTypes,
			organizationId,
			organizationName,
			assetsURL,
			status: "pending",
			notes: "",
			createdAt: serverTime,
			updatedAt: serverTime
		});
}
