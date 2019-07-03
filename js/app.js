class Tomagotchi {
  constructor(name) {
    this.name = name;
    this.age = 0;
    this.hunger = 1;
    this.fatigue = 1;
    this.boredom = 1;
    this.time = 0;
  };
  initTomagotchi() {
    const $tamDiv = $('<div id="tomagotchi">');
    const $img = $('<img src="http://images3.wikia.nocookie.net/__cb20070519201025/tamagotchi/images/3/32/Marutchi.png">');
    $tamDiv.append($img);

    const $actions = $('<div id="actions-div">');
    const $feed = $('<button class="actions">Feed</button>');
    const $lights = $('<button class="actions">Lights Out</button>');
    const $play = $('<button class="actions">Play</button>');
    $actions.append($feed);
    $actions.append($lights);
    $actions.append($play);
    $('.container').append($actions);
    
    $('.container').append($tamDiv);



    $('#name').html(`Name: <span>${this.name}</span>`);
    $('#age').text(`Age: ${this.age}`);
    $('#hunger').text(`Hunger: ${this.hunger}`);
    $('#fatigue').text(`Fatigue: ${this.fatigue}`);
    $('#boredom').text(`Boredom: ${this.boredom}`);
  };
  setTimer() {
    setInterval(() => {
      this.time += 1;
      console.log(this.time);
    if (!(this.time % 30)) {
      this.boredom += 1;
      $('#boredom').text(`Boredom: ${this.boredom}`);
      // console.log(this.boredom);
    }
    if (!(this.time % 45)) {
      this.hunger += 1;
      $('#hunger').text(`Hunger: ${this.hunger}`);
    }
    if (!(this.time % 100)) {
      this.boredom += 1;
      $('#fatigue').text(`Fatigue: ${this.fatigue}`);
    }
    if (!(this.time % 150)) {
      this.age += 1;
      $('#age').text(`Age: ${this.age}`);
    }
    }, 1000)
  }

};

$('button').on('click', (e) => {
  $(e.target).hide();

  const tomaName = prompt("Give your pet a funky name.");
  const newToma = new Tomagotchi(tomaName);

  newToma.initTomagotchi();
  newToma.setTimer();
});