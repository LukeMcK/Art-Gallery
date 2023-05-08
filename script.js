let artArray = [];
let body = document.querySelector("body");

async function getArtPiece(url) {
  try {
    let res = await fetch(url);
    let data = await res.json();
    return data;
  } catch (e) {
    console.log(`Error retrieving art piece.`);
  }
}

async function getArtGallery() {
  //API limit of 80 requests/second so making 70 requests to be safe.
  try {
    for (let i = 10000; i < 10700; i += 10) {
      let url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${i}`;

      let data = await getArtPiece(url);
      if (data.title && data.artistDisplayName && data.primaryImageSmall) {
        artArray.push(
          new ArtPiece(
            data.title,
            data.artistDisplayName,
            data.primaryImageSmall
          )
        );
      }
    }
    displayArt(artArray);
  } catch {
    console.log("Error loading art gallery.");
  }
}

getArtGallery();

class ArtPiece {
  #title;
  #artist;
  #art;
  constructor(title, artist, art) {
    this.#title = title;
    this.#artist = artist;
    this.#art = art;
  }

  getTitle() {
    return this.#title;
  }

  getArtist() {
    return this.#artist;
  }

  getArt() {
    return this.#art;
  }
}

function displayArt(arr) {
  arr.forEach((artPiece) => {
    let pieceCard = createCard(artPiece);
    body.appendChild(pieceCard);
  });
}

function createCard(artPiece) {
  let section = document.createElement("section");
  let img = document.createElement("img");
  img.src = artPiece.getArt();
  img.classList.add("artPiece");
  let pieceTitle = document.createElement("h3");
  pieceTitle.textContent = artPiece.getTitle();
  let artistName = document.createElement("p");
  artistName.textContent = artPiece.getArtist();
  section.appendChild(img);
  section.appendChild(pieceTitle);
  section.appendChild(artistName);
  section.classList.add("card");
  return section;
}
