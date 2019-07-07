//global variable for accessing tomagotchi
let newToma;

class Tomagotchi {
  constructor(name) {
    this.name = name;
    this.age = 0;
    this.hunger = 1;
    this.fatigue = 1;
    this.boredom = 1;
    this.time = 0;
    this.timerStart = 0;
    this.eating = false;
    this.playing = false;
    this.sleeping = false;
    this.actionInProgress = false;
  }
  initTomagotchi() {
    //Dom element create, edit, append
    const $tamDiv = $('<div class="tomagotchi">');
    const $jake = $('<img src="https://i.ibb.co/c1GfyH2/5c80f67c72f5d9028c17ed1c.png" id="jake" alt="5c80f67c72f5d9028c17ed1c" border="0">');
    const $jakeeating = $('<div id="eating-jake-overlay"><img src="https://i.ibb.co/4VPtN73/jake-eating-gif.gif"></div>');
    $tamDiv.append($jake);
    $tamDiv.append($jakeeating);

    const $actions = $('<div id="actions-div">');
    const $feed = $('<button class="actions" id="feed">Feed</button>');
    const $lights = $('<button class="actions" id="lights">Lights Out</button>');
    const $play = $('<button class="actions" id="play">Play</button>');
    
    $actions.append($feed);
    $actions.append($lights);
    $actions.append($play);
    
    $('.container').append($actions);
    $('.container').append($tamDiv);
    
    $('#name').html(`<span>${this.name}</span>`);
    $('#age').text(`Age: ${this.age}`);
    $('#hunger').text(`Hunger: ${this.hunger}`);
    $('#fatigue').text(`Fatigue: ${this.fatigue}`);
    $('#boredom').text(`Boredom: ${this.boredom}`);
    
    //action button event listeners
    $('#lights').on('click', () => {
      this.adjustVal('fatigue');
      this.adjustDomVal('#fatigue', `Fatigue: ${this.hunger}`);
      this.sleeping = true;
      this.timerStart = this.time;
      console.log(`${this.name} is taking a nap.`); 
    });
    $('#feed').on('click', () => {
      this.adjustVal('hunger');
      this.adjustDomVal('#hunger', `Hunger: ${this.hunger}`);
      this.eating = true;
      this.timerStart = this.time;
      console.log(`${this.name} is having a snack.`); 
    });
    $('#play').on('click', () => {
      this.adjustVal('boredom');
      this.adjustDomVal('#boredom', `Boredom: ${this.boredom}`);
      this.playing = true;
      this.timerStart = this.time;
      console.log(`${this.name} is having a blast!`);
    });
  }

  //intervals for vital stat increase
  statIntervals() {
    const timer = setInterval(() => {
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
    if (!(this.time % 65)) {
      this.fatigue += 1;
      $('#fatigue').text(`Fatigue: ${this.fatigue}`);
    }
    if (!(this.time % 100)) {
      this.age += 1;
      $('#age').text(`Age: ${this.age}`);
    }
    //on-screen state changes triggered by action buttons
    if (this.sleeping) {
      console.log(`timer started at ${this.timerStart}`);
      $('body').attr('id', 'night-bg');
      $('#jake').attr('src', 'https://i.ibb.co/TRrPHjv/sleeppocketjake.png');
      $('.tomagotchi').attr('id', 'sleeping-jake');
      if ((this.time - this.timerStart) === 5) {
        $('body').removeAttr('id');
        $('#jake').attr('src', 'https://i.ibb.co/c1GfyH2/5c80f67c72f5d9028c17ed1c.png');
        $('.tomagotchi').removeAttr('id');
        this.sleeping = false;
      }
    }

    if (this.playing) {
      console.log(`timer started at ${this.timerStart}`);
      $('#jake').attr('src', 'https://i.ibb.co/T0Zf69Q/35073-7-adventure-time-transparent-image.png');
      $('#jake').attr('class', 'play-jake');
      if ((this.time - this.timerStart) === 6) {
        $('#jake').removeAttr('class');
        $('#jake').attr('src', 'https://i.ibb.co/c1GfyH2/5c80f67c72f5d9028c17ed1c.png');
        this.playing = false;
      }
    }

    if (this.eating) {
      console.log(`timer started at ${this.timerStart}`);
      $('#jake').css('opacity', 0);
      $('#eating-jake-overlay').css('opacity', 1);
      if ((this.time - this.timerStart) === 4) {
        $('#eating-jake-overlay').css('opacity', 0);
        $('#jake').css('opacity', 1);
        this.eating = false;
      }
    }
    //if tomagotchi is dead, clear timer interval
    const checkAlive = this.checkLevel(this);
    // console.log(`${checkAlive} <--- alive?`)
    if (!checkAlive) {
      clearInterval(timer);
    }
    }, 1000);
  }

  //Check vital stats for fatal levels, return false if dead
  checkLevel() {
    for (let prop in this) {
      if (this[prop] >= 10 && prop !== 'time' && prop !== 'timerStart') {
        $('.tomagotchi').empty();
        if(confirm(`${this.name} died of ${prop}.`)) {
          window.location.reload();  
        }
        return false;
      }
    }  
    return true;
  }

  //Action button helper functions
  adjustVal(prop) {
    this[prop] -= 2;
    if (this[prop] < 1) this[prop] = 1;
  }
  adjustDomVal(id, val) {
    $(id).text(val);
  }

  changeBackground(val) {
    $('body').css({"background": val});
    console.log(`${val} <----- changeBackground`);
  }
};

//put below in game object?

//Spawn tomagotchi
$('#spawn').on('click', (e) => {
  $(e.target).hide();

  const tomaName = `${prompt("Give your Jake a name.")}-Jake`;
  newToma = new Tomagotchi(tomaName);

  newToma.initTomagotchi();
  newToma.statIntervals();
});