class Tomagotchi {
  constructor(name) {
    this.name = name;
    this.age = 0;
    this.hunger = 0;
    this.sleepiness = 0;
    this.boredom = 0;
  }
  initTomagotchi() {
    const $tamDiv = $('<div id="tomagotchi">');
    const $img = $('<img src="http://images3.wikia.nocookie.net/__cb20070519201025/tamagotchi/images/3/32/Marutchi.png">');
    $tamDiv.append($img);
    $('.container').append($tamDiv);
  }
};

$('button').on('click', (e) => {
  $(e.target).hide();

  const tomaName = prompt("Give your pet a funky name.");
  const newToma = new Tomagotchi(tomaName);

  newToma.initTomagotchi();

  $('#name').text(`Name: ${tomaName}`);
  $('#age').text(`Age: 0`);
  $('#hunger').text(`Hunger: 0`);
  $('#fatigue').text(`Fatigue: 0`);
  $('#boredom').text(`Boredom: 0`);
});