document.addEventListener("DOMContentLoaded", function () {
  fetchGames();
});

async function fetchGames() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/version-group/');
    const data = await response.json();
    const games = extractGameData(data.results);
    createGameCards(games);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function extractGameData(results) {
  const excludeGames = [
    "lets-go-pikachu-lets-go-eevee",
    "sword-shield",
    "ultra-sun-ultra-moon",
    "sun-moon",
    "xd",
    "black-2-white-2",
    "colosseum"
  ];

  const gameSet = new Set();

  results.forEach(game => {
    if (!excludeGames.includes(game.name)) {
      const separateGames = game.name.split('-');
      separateGames.forEach(singleGame => {
        if (!excludeGames.includes(singleGame)) {
          gameSet.add(singleGame);
        }
      });
    }
  });

  return Array.from(gameSet).map(gameName => ({
    name: gameName,
    url: `https://pokeapi.co/api/v2/version-group/${gameName}/`
  }));
}

async function createGameCards(games) {
  const container = document.querySelector(".container");

  // Promise.all para mejorar el rendimiento
  const cardPromises = games.map(async (game, index) => {
    try {
      const releaseDate = getManualReleaseDate(game.name);
      const size = getManualFileSize(game.name);
      const emulator = getManualEmulator(game.name);
      const imageUrl = getImageUrl(game.name);
      const downloadLinkWindows = getDownloadLink(game.name, 'windows');

      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img class="img lazy" data-src="${imageUrl}" alt="portada de ${game.name}">
        <h5>Pokemon ${game.name}</h5>
        <small class="size">Peso: ${size}</small>
        <small class="years">Lanzamiento: ${releaseDate}</small>
        <p>Emulador: <a href="../html/emuladores.html">${emulator}</a></p>
        <button class="btn-fil" onclick="window.open('${downloadLinkWindows}','_blank')">Descargar</button>
      `;

      container.appendChild(card);
    } catch (error) {
      console.error(`Error fetching details for ${game.name}:`, error);
    }
  });

  await Promise.all(cardPromises);

  lazyLoadImages();
  reorganizeCards();
}

function lazyLoadImages() {
  const lazyImages = document.querySelectorAll('.lazy');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach(image => {
    observer.observe(image);
  });
}

function getManualReleaseDate(gameName) {
  const releaseDates = {
    "red": 1996,
    "blue": 1996,
    "yellow": 1998,
    "gold": 1999,
    "silver": 1999,
    "crystal": 2000,
    "ruby": 2002,
    "sapphire": 2002,
    "emerald": 2004,
    "firered": 2004,
    "leafgreen": 2004,
    "diamond": 2006,
    "pearl": 2006,
    "platinum": 2008,
    "heartgold": 2009,
    "soulsilver": 2009,
    "black": 2010,
    "white": 2010,
    "x": 2013,
    "y": 2013,
    "omega": 2014,
    "alpha": 2014
  };

  return releaseDates[gameName] || 'N/A';
}

function getManualFileSize(gameName) {
  const fileSizes = {
    "red": "512 KB",
    "blue": "512 KB",
    "yellow": "1 MB",
    "gold": "1 MB",
    "silver": "1 MB",
    "crystal": "2 MB",
    "ruby": "4 MB",
    "sapphire": "4 MB",
    "emerald": "16 MB",
    "firered": "16 MB",
    "leafgreen": "16 MB",
    "diamond": "64 MB",
    "pearl": "64 MB",
    "platinum": "64 MB",
    "heartgold": "128 MB",
    "soulsilver": "128 MB",
    "black": "256 MB",
    "white": "256 MB",
    "x": "1.7 GB",
    "y": "1.7 GB",
    "omega": "1.8 GB",
    "alpha": "1.8 GB"
  };

  return fileSizes[gameName] || 'N/A';
}

function getManualEmulator(gameName) {
  const emulators = {
    "red": "Game Boy",
    "blue": "Game Boy",
    "yellow": "Game Boy",
    "gold": "Game Boy Color",
    "silver": "Game Boy Color",
    "crystal": "Game Boy Color",
    "ruby": "Game Boy Advance",
    "sapphire": "Game Boy Advance",
    "emerald": "Game Boy Advance",
    "firered": "Game Boy Advance",
    "leafgreen": "Game Boy Advance",
    "diamond": "Nintendo DS",
    "pearl": "Nintendo DS",
    "platinum": "Nintendo DS",
    "heartgold": "Nintendo DS",
    "soulsilver": "Nintendo DS",
    "black": "Nintendo DS",
    "white": "Nintendo DS",
    "x": "Nintendo 3DS",
    "y": "Nintendo 3DS",
    "omega": "Nintendo 3DS",
    "alpha": "Nintendo 3DS"
  };

  return emulators[gameName] || 'N/A';
}

function getImageUrl(gameName) {
  const gameImages = {
    "red": "https://th.bing.com/th/id/OIP.yoVzWwHhCVTj_GYzToAYVQHaGm?rs=1&pid=ImgDetMain",
    "blue": "https://media.s-bol.com/736vq48GP7O8/1200x1192.jpg",
    "yellow": "https://i5.walmartimages.com/asr/f2a44823-0802-4fbd-b7ea-c4a07fd59f8d.b71df0637df4af49799f13e92625ef64.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff",
    "gold": "https://www.lukiegames.com/assets/images/GBC/gbc_pokemon_gold_p_68q9gc.jpg",
    "silver": "https://th.bing.com/th/id/OIP.nd4q1DW3zOfZRo4a267eKQHaHa?rs=1&pid=ImgDetMain",
    "crystal": "https://th.bing.com/th/id/R.0e7a773d59474d6a8cca1f4ba311b943?rik=Wv36BAJnsDUBoA&pid=ImgRaw&r=0",
    "ruby": "https://th.bing.com/th/id/R.a8c513735a9611a6ea632c70f780fbb1?rik=UV8brGM%2frE4z5w&pid=ImgRaw&r=0",
    "sapphire": "https://cdn.wikimg.net/en/strategywiki/images/0/02/Pokemon_Sapphire.jpg",
    "emerald": "https://th.bing.com/th/id/OIP.83JZ066gqf2ZdNMWo9KuQgHaHa?rs=1&pid=ImgDetMain",
    "firered": "https://d1fs8ljxwyzba6.cloudfront.net/assets/editorial/2017/10/pokemon-fire-red-original.jpg",
    "leafgreen": "https://th.bing.com/th/id/OIP.0IH_c3tKlirVD9QusCdKhAAAAA?rs=1&pid=ImgDetMain",
    "diamond": "https://cdn10.bigcommerce.com/s-kl71q8/products/6397/images/24471/pokemondiamondNDS__26086.1492751164.1280.1280.jpg?c=2",
    "pearl": "https://www.lukiegames.com/assets/images/DS/ds_pokemon_pearl_p_ak7j9c.jpg",
    "platinum": "https://vignette.wikia.nocookie.net/nintendo/images/0/0f/Pokemon_Platinum_(NA).jpg/revision/latest?cb=20111104162923&path-prefix=en",
    "heartgold": "https://th.bing.com/th/id/OIP.89o6ZVTRDkrqMUeSwB0lBAHaGw?rs=1&pid=ImgDetMain",
    "soulsilver": "https://romspure.cc/wp-content/uploads/2020/05/1589282566-727e850b-414f-4d2b-a3ce-c5184e119902.jpg",
    "black": "https://th.bing.com/th/id/OIP.Par4fXVLfxSX9uKOLecGYQAAAA?rs=1&pid=ImgDetMain",
    "white": "https://www.lukiegames.com/assets/images/DS/ds_pokemon_white_p_2jfz1n.jpg",
    "x": "https://th.bing.com/th/id/R.327d39c58bf6ef0e7817ff4efeefb85b?rik=La55GMekoKAZow&pid=ImgRaw&r=0",
    "y": "https://media.gamestop.com/i/gamestop/10107642/Pokemon-Y",
    "omega": "https://th.bing.com/th/id/OIP.FCAu1NYZkV-n2eFRppCpbQAAAA?rs=1&pid=ImgDetMain",
    "alpha": "https://m.media-amazon.com/images/I/71gJM7HSx5L._AC_SX466_.jpg"
  };

  return gameImages[gameName] || "https://cdn.bulbagarden.net/upload/thumb/a/a3/Pok%C3%A9mon_logo.png/800px-Pok%C3%A9mon_logo.png";
}

function getDownloadLink(gameName, platform) {
  const downloadLinks = {
    "red": {
      "windows": "https://drive.google.com/uc?export=download&id=15utVTMWIqDg7wNNIq9ALD3UM3BAPOZYA",
    },
    "blue": {
      "windows": "https://drive.google.com/uc?export=download&id=1nDmtotbiIkd77HzQTuvlje6LgZfWneUi",
    },

    "Yellow": { 
      "windows": "https://drive.google.com/uc?export=download&id=1AmIaD5fX-1qcXESr3Tcn2652XeXVXE9l",
    },

    "gold": {
      "windows": "https://drive.google.com/uc?export=download&id=1xX79wmjcPGzSh4SoARzLteWfUzNr8Met",
    },

    "silver": { 
      "windows": "https://drive.google.com/uc?export=download&id=13MwHjo3-a5xZDGHYABDbB9zPNMFxwv9P",
    },

  "crystal": {
      "windows": "https://drive.google.com/uc?export=download&id=1gIH5ZvjAOLiNd1T5xnXppqUnUK85zUF6",
    },

  };

  return downloadLinks[gameName]?.[platform] || "#";
}

function downloadFile(url, filename) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function reorganizeCards() {
  const container = document.querySelector(".container");
  const cards = document.querySelectorAll(".card");
  container.innerHTML = ''; // Limpiar el contenedor 
  let box;
  cards.forEach((card, index) => {
    if (index % 3 === 0) {
      box = document.createElement("div");
      box.className = "boxes";
      container.appendChild(box);
    }
    box.appendChild(card);
  });
}

// Barra de búsqueda de juego Pokémon
const search = document.querySelector('.search');
const btn_search = document.querySelector('.btn_search');
const input = document.querySelector('.input');

btn_search.addEventListener('click', () => {
  search.classList.toggle('active');
  input.focus();
});