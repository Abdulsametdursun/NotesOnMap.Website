// save sent data on local
export const setStorage = (data) => {
  // Convert incoming data to string
  const strData = JSON.stringify(data);
  // save to local
  localStorage.setItem("notes", strData);
};

// For contents corresponding to values
export const translate = {
  goto: "Visit",
  home: "Home",
  job: "Work Place",
  park: "Parking Place",
};

// get element from local and send it back
export const getStorage = (key) => {
  const strData = localStorage.getItem(key);
  return JSON.parse(strData);
};

// https://www.mappity.org/
export var userIcon = L.icon({
  iconUrl: "/pointer.png",
  iconSize: [55, 55],
  shadowUrl: "/shadow.png",
  popupAnchor: [0, -20],
  shadowSize: [68, 95],
  shadowAnchor: [30, 60],
});
var gotoIcon = L.icon({
  iconUrl: "/Plane.png",
  iconSize: [50, 50],
  shadowUrl: "/shadow.png",
  popupAnchor: [0, -20],
  shadowSize: [68, 95],
  shadowAnchor: [30, 60],
});
var homeIcon = L.icon({
  iconUrl: "/Home.png",
  iconSize: [50, 50],
  shadowUrl: "/shadow.png",
  popupAnchor: [0, -20],
  shadowSize: [68, 95],
  shadowAnchor: [30, 60],
});
var jobIcon = L.icon({
  iconUrl: "/Briefcase.png",
  iconSize: [50, 50],
  shadowUrl: "/shadow.png",
  popupAnchor: [0, -20],
  shadowSize: [68, 95],
  shadowAnchor: [30, 60],
});
var parkIcon = L.icon({
  iconUrl: "/Parking.png",
  iconSize: [50, 50],
  shadowUrl: "/shadow.png",
  popupAnchor: [0, -20],
  shadowSize: [68, 95],
  shadowAnchor: [30, 60],
});

// For contents corresponding to values
export const icons = {
  goto: gotoIcon,
  home: homeIcon,
  job: jobIcon,
  park: parkIcon,
};
