let newToma;

class Tomagotchi {
  constructor(name) {
    this.name = name;
    this.age = 0;
    this.hungry = 1;
    this.tired = 1;
    this.bored = 1;
    this.time = 0;
  }
  initTomagotchi() {
    const $tamDiv = $('<div id="tomagotchi">');
    const $img = $('<img src="https://i.ibb.co/c1GfyH2/5c80f67c72f5d9028c17ed1c.png" alt="5c80f67c72f5d9028c17ed1c" border="0">');
    $tamDiv.append($img);

    const $actions = $('<div id="actions-div">');
    const $feed = $('<button class="actions" id="feed">Feed</button>');
    const $lights = $('<button class="actions" id="lights">Lights Out</button>');
    const $play = $('<button class="actions" id="play">Play</button>');

    
    $actions.append($feed);
    $actions.append($lights);
    $actions.append($play);
    
    
    $('.container').append($actions);
    $('.container').append($tamDiv);
    
    $('#name').html(`Name: <span>${this.name}</span>`);
    $('#age').text(`Age: ${this.age}`);
    $('#hunger').text(`Hunger: ${this.hungry}`);
    $('#fatigue').text(`Fatigue: ${this.tired}`);
    $('#boredom').text(`Boredom: ${this.bored}`);
    
    $('#lights').on('click', (e) => {
      console.log(e.target); 
    });
  }
  statIntervals() {
    setInterval(() => {
      this.time += 1;
      console.log(this.time);
    if (!(this.time % 30)) {
      this.bored += 1;
      $('#boredom').text(`Boredom: ${this.bored}`);
      // console.log(this.boredom);
    }
    if (!(this.time % 45)) {
      this.hungry += 1;
      $('#hunger').text(`Hunger: ${this.hungry}`);
    }
    if (!(this.time % 100)) {
      this.tired += 1;
      $('#fatigue').text(`Fatigue: ${this.tired}`);
    }
    if (!(this.time % 180)) {
      this.age += 1;
      $('#age').text(`Age: ${this.age}`);
    }

    this.checkLevel(this);
    }, 1000);
  }
  checkLevel() {
    for (let prop in this) {
      if (this[prop] === 10 && (prop !== 'time')) {
        alert(`${this.name} died, they were too ${prop}.`);
      }
    }  
  }
};

//put below in game object

$('#spawn').on('click', (e) => {
  $(e.target).hide();

  const tomaName = prompt("Give your pet a funky name.");
  newToma = new Tomagotchi(tomaName);

  newToma.initTomagotchi();
  newToma.statIntervals();
});