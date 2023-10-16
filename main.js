import {
  userIcon,
  setStorage,
  getStorage,
  translate,
  icons,
} from "./helpers.js";

// Come from HTML
const form = document.querySelector("form");
const input = document.querySelector("form #title");
const cancelBtn = document.querySelector("form #cancel");
const noteList = document.querySelector("ul");
const expand = document.querySelector("#checkbox");
const aside = document.querySelector(".wrapper");

var map;
var coords = [];
var notes = getStorage("notes") || [];
var markerLayer = [];

// Event Listeners
cancelBtn.addEventListener("click", () => {
  form.style.display = "none";
  clearForm();
});

// position the map based on the user's location
function loadMap(coords) {
  map = L.map("map").setView(coords, 14);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Separate layer for cursors
  markerLayer = L.layerGroup().addTo(map);

  // make a marker to show user location
  L.marker(coords, { icon: userIcon }).addTo(map).bindPopup("Your Location");

  //Print notes from local to the screen
  renderNoteList(notes);

  // Tracks click events on the map
  map.on("click", onMapClick);
}

// Listens sending forms
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // getting forms data
  const title = e.target[0].value;
  const date = e.target[1].value;
  const status = e.target[2].value;
  // add this element to the notes array
  notes.unshift({
    id: new Date().getTime(),
    title,
    date,
    status,
    coords,
  });
  // list the notes
  renderNoteList(notes);

  // save elements in local
  setStorage(notes);

  // close form
  form.style.display = "none";
  clearForm();
});

// print cursor on screen
function renderMarker(item) {
  // creat cursor
  L.marker(item.coords, { icon: icons[item.status] })
    // add cursor to separate
    .addTo(markerLayer)
    // add popup
    .bindPopup(item.title);
}

// prints notes list
function renderNoteList(items) {
  // delete old element
  noteList.innerHTML = ``;
  // delete old cursor
  markerLayer.clearLayers();

  // print a function for each element
  items.forEach((element) => {
    // create li element
    const listEle = document.createElement("li");

    // add data-id
    listEle.dataset.id = element.id;

    // determining the content
    listEle.innerHTML = `
            <div>
            <p>${element.title}</p>
            <p><span>Date:</span>${element.date}</p>
            <p><span>Status:</span>${translate[element.status]}</p>
            </div>
            <i id="fly" class="bi bi-airplane-fill"></i>
            <i id="delete" class="bi bi-trash-fill"></i>
    `;
    // send data to HTML
    noteList.appendChild(listEle);
    // print cursor
    renderMarker(element);
  });
}

// request the user's location
navigator.geolocation.getCurrentPosition(
  // if user let, open map from user's location
  (e) => loadMap([e.coords.latitude, e.coords.longitude]),
  // if user not let, open map from this location
  () => {
    loadMap([38.802424, 35.505317]);
  }
);

// Function that works when you click on the map
const onMapClick = (e) => {
  // Transfer coordinates to common area
  coords = [e.latlng.lat, e.latlng.lng];
  // Show form
  form.style.display = "flex";
  // focus on first input
  input.focus();
};

// Clear Form
function clearForm() {
  form[0].value = "";
  form[1].value = "";
  form[2].value = "goto";
}

// Delete and Fly Icons
noteList.addEventListener("click", (e) => {
  const found_id = e.target.closest("li").dataset.id;

  if (e.target.id === "delete" && confirm("Are you sure you want to delete?")) {
    // delete element from array
    notes = notes.filter((note) => note.id !== Number(found_id));
    // update local
    setStorage(notes);
    // update screen
    renderNoteList(notes);
  }

  if (e.target.id === "fly") {
    // getting coordinate from id
    const note = notes.find((note) => note.id === Number(found_id));
    // run animation
    map.flyTo(note.coords, 15);

    // Create a temporary popup with some content
    var popup = L.popup().setLatLng(note.coords).setContent(note.title);
    // Open the popup at the specified coordinates

    // fly on small screens
    if (window.innerWidth < 769) {
      checkbox.checked = false;
      aside.classList.add("hide");
    }
    // open pop
    popup.openOn(map);
  }
});

// Show and hide Notes
checkbox.addEventListener("input", (e) => {
  const isChecked = e.target.checked;

  if (isChecked) {
    aside.classList.remove("hide");
  } else {
    aside.classList.add("hide");
  }
});
