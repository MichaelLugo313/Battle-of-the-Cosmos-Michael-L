// Define images for ease of reuse
const apartmentImage = '../assets/Apartment.png';
const apartmentExplosionImage = '../assets/Apartment_Explosion.png';
const hallwayImage = '../assets/Apartment_Hallway.png';
const hallwayWithCultistImage = '../assets/Hallway_with_Cultist.png';
const deadCultistImage = '../assets/Dead_Cultist.png';
const cultistFiringImage = '../assets/Cultist_Firing.png';
const plasmaBombHallwayImage = '../assets/Plasma_Bomb_Hallway.png';
const hallwayElevatorImage = '../assets/Hallway_Elevator.png';
const geraldCantinaImage = '../assets/Gerald_Cantina.png';
const infirmaryImage = '../assets/Infirmary.png';
const orbitalElevatorImage = '../assets/Orbital_Elevator.png';
const orbitalElevatorLobbyImage = '../assets/Orbital_Elevator_Lobby.png';
const elevatorChamberLowImage = '../assets/Elevator_Chamber_low.png';
const elevatorChamberHighImage = '../assets/Elevator_Chamber_high.png';
const clovisAtopOrbitalElevatorImage = '../assets/Clovis_Atop_Orbital_Elevator.png';
const drydockWithOLImage = '../assets/Drydock_with_OL.png';
const tbcImage = '../assets/To_be_continued.jpg';
const geraldAvatar = '../assets/Gerald_Face.png';
const clovisAvatar = '../assets/Clovis_face.png';

export const storyPages = [
  {
    id: 1,
    title: 'Prologue: The News from Beyond',
    text: 'You awaken in your bedroom near Stellar Command Headquarters. In the distance out the window you see various sky craft moving throughout the skyline. It takes but a moment but you remember that today is the day that the SCS Outbound Light begins its top secret mission to Pluto to respond to a mysterious transmission received six months ago. <br><br>You are the captain of the Outbound Light, and have the weight of the world on your shoulders. Anarchy and dissolution are rampant, and war threatens to bubble up all over the world. Though you do not know the contents of the message, your superiors have great hope that this mission may help turn an ailing Earth around.<br><br>The signal crystal on your wristband is flashing.',
    image: apartmentImage,
    mode: 'On Foot',
    crewDialogue: {},
    choices: [
      { text: 'Answer the call', nextPage: 2, setFlags: { answeredGeraldCall: true } },
      { text: 'Collect your belongings', nextPage: 3, addItems: [{ id: 'gyro-pistol', name: 'Gyro Pistol', icon: '⌖', description: 'A gyro jet pistol with laser propelled rounds.' }] },
      { text: 'Leave your apartment', nextPage: 5 }
    ]
  },
  {
    id: 2,
    title: 'Your Apartment',
    text: 'You tap the signal crystal, and a hologram of a familiar face appears. It\'s your Security Chief, Gerald Lossoth.<br><br>\"Greetings, Captain. I trust you are getting ready for today\'s mission?" You nod in assent. "Good." He continues. "Meet me in the Cantina on the way to the orbital elevator. And captain, you should probably grab a firearm before you leave. The latest security brief indicates that the Children of Reductionism may have gotten wind of our mission, and there\'s no telling how they will react." He signs off.<br><br>The Children of Reductionism...you\'ve heard of them. One of many cults that have popped up in recent years, violent and unpredictable. You should probably be prepared.',
    image: apartmentImage,
    mode: 'On Foot',
    crewDialogue: {},
    choices: [
      { text: 'Collect your belongings', nextPage: 3, addItems: [{ id: 'gyro-pistol', name: 'Gyro Pistol', icon: '⌖', description: 'A gyro jet pistol with laser propelled rounds.' }] },
      { text: 'Leave your apartment', nextPage: 5 },
      { text: 'Wait', nextPage: 4 }
    ]
  },
  {
    id: 3,
    title: 'Your Apartment',
    text: 'You collect your gyro jet pistol, which due to creative use of lasers fires a projectile at a fraction of the speed of light. A devastating weapon. You can never be too safe.',
    image: apartmentImage,
    mode: 'On Foot',
    crewDialogue: {},
    choices: [
      { text: 'Leave your apartment', nextPage: 5 },
      { text: 'Wait', nextPage: 4 },
    ]
  },
  {
    id: 4,
    title: 'Slain',
    text: 'You decide to wait before heading out. As a result, you are in exactly the wrong place when a plasma bomb explodes, evaporating your apartment. And you.',
    image: apartmentExplosionImage,
    mode: 'On Foot',
    crewDialogue: {},
    choices: [{ text: "Game Over", gameOver: true, gameOverMessage: "You were in the wrong place at the wrong time. The plasma explosion was instantaneous." }]
  },
  {
    id: 5,
    title: 'Hallway',
    text: 'You leave your apartment. The hallway extends beyond you. You feel unsettled by something you cannot define.',
    image: hallwayImage,
    mode: 'On Foot',
    crewDialogue: {},
    choices: [
      { text: 'Draw your weapon and move forward', nextPage: 6, requiredItems: ['gyro-pistol'], hideIfMissingItems: true },
      { text: 'Continue down the hallway', nextPage: 8, hideIfHasItems: ['gyro-pistol'], healthChange: -1 },
    ]
  },
  {
    id: 6,
    title: 'Hallway',
    text: 'As you round a corner, you come face to face with a hooded, red-cloaked figure. Startled, he draws his gun on you.',
    image: hallwayWithCultistImage,
    mode: 'On Foot',
    crewDialogue: {},
    choices: [
      { text: 'Shoot first, ask questions later.', nextPage: 7, requiredItems: ['gyro-pistol'], hideIfMissingItems: true },
      { text: 'Tackle your assailant.', nextPage: 9 },
      { text: 'Run.', nextPage: 8, healthChange: -1 }
    ]
  },
  {
    id: 7,
    title: 'Hallway',
    text: 'You land a solid shot on the figure, and he crumples to the ground. This must be an assassin sent by the Children of Reductionism.<br><br>You hear the telltale whine of a plasma bomb arming itself.',
    image: deadCultistImage,
    mode: 'On Foot',
    crewDialogue: {},
    choices: [
      { text: 'Run.', nextPage: 10 }
    ]
  },
  {
    id: 8,
    title: 'Hallway',
    text: 'A shot rings out from the robed figure in the hallway, winging you in the arm. Then, he raises his arm, holding a plasma bomb. He presses the trigger.',
    image: cultistFiringImage,
    mode: 'On Foot',
    crewDialogue: {},
    choices: [
      { text: 'Run', nextPage: 10 }
    ]
  },
  {
    id: 9,
    title: 'Slain',
    text: 'You shoulder check the figure, knocking him down. As you pin him to the ground, you see him smile menacingly, at the same time as you hear a plasma bomb arm itself. At this range, there is no way to escape, and you are both destroyed along with the hallway as it detonates.',
    image: plasmaBombHallwayImage,
    mode: 'On Foot',
    crewDialogue: {},
    choices: [{ text: "Game Over", gameOver: true, gameOverMessage: "You were in the wrong place at the wrong time. The plasma explosion was instantaneous." }]
  },
  {
    id: 10,
    title: 'Elevator Door',
    text: 'You run harder than you\'ve ever run before. Moments later you hear and feel the powerful explosion wreck the hallway. You won\'t be getting back to your apartment any time soon.<br><br>You continue to run until you reach the elevator, and then take a few moments to catch your breath. As you recover, the signal crystal on your wristband lights up again.',
    image: hallwayElevatorImage,
    mode: 'On Foot',
    crewDialogue: {},
    choices: [
      { text: 'Answer the call.', nextPage: 11, requiredFlags: ['answeredGeraldCall'], hideIfMissingFlags: true },
      { text: 'Answer the call this time.', nextPage: 12, hideIfHasFlags: ['answeredGeraldCall'] }
    ]
  },
  {
    id: 11,
    title: 'Elevator Door',
    text: '"Captain! The explosion alarms lit up just outside your apartment! Are you alright?" You explain what happened, and your encounter with the assassin. "That was far too close a call. Operational security is definitely compromised. Please come see me right away."<br><br>You assent, and proceed to take the elevator.',
    image: hallwayElevatorImage,
    mode: 'On Foot',
    crewDialogue: {},
    choices: [
      { text: 'Take the elevator down to the Cantina.', nextPage: 13, healthRequirement: { operator: '=', value: 4}},
      { text: 'Take the elevator down to the Cantina.', nextPage: 14, healthRequirement: { operator: '<', value: 4}}
    ]
  },
  {
    id: 12,
    title: 'Elevator Door',
    text: '"Captain!" The holographic face of your security chief Gerald Lossoth is alarmed. "The explosion alarms lit up just outside your apartment! Are you alright?"<br><br>You relate your encounter with the mysterious figure. He nods.<br><br>"We had a security brief that the Children of Reductionism may have gotten wind of our mission. I tried to call you earlier to inform you." He looks a little miffed.<br><br>The Children of Reductionism...you\'ve heard of them. One of many cults that have popped up in recent years, violent and unpredictable.<br><br>"That was far too close a call. Operational security is definitely compromised. Please come see me right away."<br><br>You assent, and proceed to take the elevator.',
    image: hallwayElevatorImage,
    mode: 'On Foot',
    crewDialogue: {},
    choices: [
      { text: 'Take the elevator down to the Cantina.', nextPage: 13, healthRequirement: { operator: '=', value: 4}},
      { text: 'Take the elevator down to the Cantina.', nextPage: 14, healthRequirement: { operator: '<', value: 4}}
    ]
  },
  {
    id: 13,
    title: 'Cantina',
    text: 'You arrive at the Cantina. The mood is tense, and you see some security forces standing around.<br><br>Gerald greets you, his face tense with worry.<br><br>"Good to see you in one piece, Captain. I\'ve arranged for security to secure our route to the orbital elevator. We should get going right away."',
    image: geraldCantinaImage,
    mode: 'On Foot',
    crewDialogue: {
      gerald: 'Glad you made it in one piece, Captain. Let\'s get to the ship before anything else happens.'
    },
    choices: [
      { 
        text: 'Leave the Cantina with Gerald and head to the orbital elevator.', 
        nextPage: 16,
        addCrew: [
          { 
            id: 'gerald', 
            name: 'Gerald Lossoth', 
            role: 'Security Chief',
            avatar: geraldAvatar,
            dialogue: 'I\'ll keep us safe, Captain. You can count on that.'
          }
        ]
      }
    ]
  },
  {
    id: 14,
    title: 'Cantina',
    text: 'You arrive at the Cantina. The mood is tense, and you see some security forces standing around. Your grip on your wound is tight.<br><br>Gerald greets you, his face tense with worry.<br><br>"Captain, you didn\'t say you were hit!. We should get you to the infirmary immediately." You nod weakly.',
    image: geraldCantinaImage,
    mode: 'On Foot',
    crewDialogue: {},
    choices: [
      { 
        text: 'Leave the Cantina with Gerald and head to the infirmary.', 
        nextPage: 15, 
        healthChange: 1,
        addCrew: [
          { 
            id: 'gerald', 
            name: 'Gerald Lossoth', 
            role: 'Security Chief',
            avatar: geraldAvatar,
            dialogue: 'I\'ll keep us safe, Captain. You can count on that.'
          }
        ]
      }
    ]
  },
  {
    id: 15,
    title: 'Infirmary',
    text: 'The infirmary glows with blue light, as do the eyes of the doctor on call. Electronic contact lenses, made to assist with managing all of the data necessary to treat a patient.<br><br>The doctor notices your wound, and directs you to the table. "This doesn\'t look too bad, this should just take a minute." He examines the wound and determines the bullet went clean through. He injects med gel into it, dulling the pain and jumpstarting the healing process, then applies a smart bandage around your arm.<br><br>Gerald chimes in. "I\'ve arranged for security to secure our route to the orbital elevator. We should get going right away."',
    image: infirmaryImage,
    mode: 'On Foot',
    crewDialogue: {
      gerald: 'They\'ll get you patched up right away.'
    },
    choices: [
      { text: 'Head to the Orbital Elevator.', nextPage: 16 },
    ]
  },
  {
    id: 16,
    title: 'Orbital Elevator',
    text: 'You make the journey without incident. Security is clearly hightened. The massive orbital elevator comes into view. One of the crowning achievements of humanity, it can ferry you into orbit in around 3 hours. ',
    image: orbitalElevatorImage,
    mode: 'On Foot',
    crewDialogue: {
      gerald: 'Awesome, isn\'t it? Never fails to impress me. I hate to think what could happen if the Children attacked it in earnest.'
    },
    choices: [
      { text: 'Enter the orbital elevator.', nextPage: 17 }
    ]
  },
  {
    id: 17,
    title: 'Inside the Orbital Elevator Lobby',
    text: 'Inside the Orbital Elevator\'s lobby, you see civilians milling about, chatting with each other,and numerous security guards. Besides that, it looks like any other day.',
    image: orbitalElevatorLobbyImage,
    mode: 'On Foot',
    crewDialogue: {
      gerald: 'Business as usual.'
    },
    choices: [
      { text: 'Ride the Orbital Elevator to orbit.', nextPage: 18 }
    ]
  },
  {
    id: 18,
    title: 'Riding the Orbital Elevator',
    text: 'You and Gerald enter a personnel elevator, and strap yourselves into your acceleration seats. Moments later, you feel the lift mechanism activate, and sense the pressure as you accelerate to 1.5 Gs. It\'s not quite uncomfortable.',
    image: elevatorChamberLowImage,
    mode: 'On Foot',
    crewDialogue: {
      gerald: '...'
    },
    choices: [
      { text: 'Ride in silence.', nextPage: 19 },
      { text: 'Chat with Gerald.', nextPage: 20 }
    ]
  },
  {
    id: 19,
    title: 'Riding the Orbital Elevator',
    text: 'You take the opportunity to relax, and reflect. You won\'t know the true mission parameters until you board the Outbound Light and open your sealed orders. The fate of mankind could be at stake. This will be an adventure like no other.',
    image: elevatorChamberHighImage,
    mode: 'On Foot',
    crewDialogue: {
      gerald: 'I have to admit, I\'m getting excited about this mission.'
    },
    choices: [
      { text: 'Ride to the top of the Orbital Elevator.', nextPage: 24 }
    ]
  },
  {
    id: 20,
    title: 'Riding the Orbital Elevator',
    text: 'You decide to chat with Gerald.',
    image: elevatorChamberHighImage,
    mode: 'On Foot',
    crewDialogue: {
      gerald: 'Captain?'
    },
    choices: [
      { text: '"What do you know about the mission?"', nextPage: 21, setFlags: { elevatorChat: true} },
      { text: '"What do you think about the current state of the world?"', nextPage: 22, setFlags: { elevatorChat: true} },
      { text: '"How is your family?"', nextPage: 23, setFlags: { elevatorChat: true} },
      { text: 'You decide to relax.', nextPage: 19, requiredFlags: ['elevatorChat'], hideIfMissingFlags: true }
    ]
  },
  {
    id: 21,
    title: 'Riding the Orbital Elevator',
    text: '"Not much. I know it involves a transmission from the edge of the solar system. I\'ve been briefed on the defensive capabilities of the Outbound Light, and frankly they\'re astonishing. No ballistic weaponry, purely energy based weapons that frankly, should not be possible. Whatever we run into out there, we\'ll be more than ready for it."',
    image: elevatorChamberHighImage,
    mode: 'On Foot',
    crewDialogue: {
      gerald: 'I can only guess at how this technology came to be.'
    },
    choices: [
      { text: 'Continue chatting.', nextPage: 20 },
      { text: 'You decide to relax.', nextPage: 19, requiredFlags: ['elevatorChat'], hideIfMissingFlags: true }
    ]
  },
  {
    id: 22,
    title: 'Riding the Orbital Elevator',
    text: '"I\'m not sure if I\'m worried, or terrified. I\'ve been hearing rumors for days now that a military Junta has taken control of Russia, and its nuclear arsenal. Meanwhile, the fact that the Children of Reducitionism not only found out about this mission, but managed to nearly assassinate you, beggars belief. I\'ve never been a part of an operation with as much secrecy."',
    image: elevatorChamberHighImage,
    mode: 'On Foot',
    crewDialogue: {
      gerald: 'I can hardly imagine things getting worse, but that seems to be the way things are going.'
    },
    choices: [
      { text: 'Continue chatting.', nextPage: 20 },
      { text: 'You decide to relax.', nextPage: 19, requiredFlags: ['elevatorChat'], hideIfMissingFlags: true }
    ]
  },
  {
    id: 23,
    title: 'Riding the Orbital Elevator',
    text: '"My wife is -not- happy that I\'m going to be away for an unknown amount of time on a mission too secret for me to tell her about. We\'re expecting a kid, too. Normally I\'d be pretty upset that we\'re going to Pluto, but the mission parameters indicate it should only take us a week. I don\'t even know how that\'s possible."',
    image: elevatorChamberHighImage,
    mode: 'On Foot',
    crewDialogue: {
      gerald: 'I\'m going to owe my wife bigtime after this is all said and done.'
    },
    choices: [
      { text: 'Continue chatting.', nextPage: 20 },
      { text: 'You decide to relax.', nextPage: 19, requiredFlags: ['elevatorChat'], hideIfMissingFlags: true }
    ]
  },
  {
    id: 24,
    title: 'Atop the Orbital Elevator',
    text: 'You reach the top of the Orbital Elevator. Unsurprisingly, there is more security patrolling the area. Then you recognize the form of your chief engineer, Clovis Dyne.<br><br>"<b>Good</b> afternoon Captain. I heard you ran into some trouble planetside." You nod. "Well, let\'s hope there\'s no more of that. Come on, let\'s board a shuttle to the drydock, the rest of the crew is waiting for us aboard the Outbound Light."',
    image: clovisAtopOrbitalElevatorImage,
    mode: 'On Foot',
    crewDialogue: {      
    },
    choices: [
      { text: 'Board a shuttle to the Perry Naval Dock.', nextPage: 25,
      addCrew: [
          { 
            id: 'clovis', 
            name: 'Clovis Dyne', 
            role: 'Chief Engineer',
            avatar: clovisAvatar,
            dialogue: 'Always be prepared, I say.'
          }
        ]
      }
    ]
  },
  {
    id: 25,
    title: 'Approaching the Perry Naval Dock',
    text: 'The magnificent Perry Naval Dock quickly comes into view. Many ships are docked here, the largest being a mining transport under construction. The comparitively small but sleek Outbound Light draws closer in the center of your field of view.',
    image: drydockWithOLImage,
    mode: 'On Foot',
    crewDialogue: {
      gerald: 'Beautiful. Just beautiful.',
      clovis: 'You wanted to ask me something, Captain?'
    },
    choices: [
      { text: '"Clovis, what do you know about the Outbound Light\'s capabilities?"', nextPage: 26 }
    ]
  },
  {
    id: 26,
    title: 'Approaching the Perry Naval Dock',
    text: 'He considers for a moment. "I\'ve been briefed on several things that I barely understand beyond how to make them work. Things that seem straight out of science fiction. Matter-energy converters which will allow us to generate food and other resources, meaning our operational time is effecitvely unlimited. A magnetic bubble which surrounds the ship, deflecting any debris we might encounter. I\'m sure you know, the idea of an energy "shield" is considered to be totally impossible. But maybe the most incredible thing is its drive. Instead of a pulsed fusion drive, it uses a sort of antimatter-pion drive, which means instead of taking 18 months to get to Pluto, it should only take us about a week. Honestly, I\'m more ready to believe that this is all some kind of joke at our expense than that any of this technology is real."',
    image: drydockWithOLImage,
    mode: 'On Foot',
    crewDialogue: {
      gerald: 'Holy shit.',
      clovis: 'Totally unbelievable.'
    },
    choices: [
      { text: 'You rock back in your seat. This goes well beyond your expectations. You all sit in silence as you approach the Outbound Light.', nextPage: 27 }
    ]
  },
  {
    id: 27,
    title: 'Boarding the Outbound Light',
    text: 'The vehicle pulls into the hanger of the Perry Naval Dock. Through the window you can see the Outbound Light, suspended by scaffolding. It\'s sleek and angular, with a blue surface that seems to capture the light. The ship is smaller than you expected - about the size of a large jet - but it radiates an aura of advanced technology that takes your breath away.',
    image: drydockWithOLImage,
    mode: 'On Foot',
    crewDialogue: {
      gerald: 'That\'s our ship?',
      clovis: 'Incredible...'
    },
    choices: [
      { text: 'Board the Outbound Light.', nextPage: 28 }
    ]
  },
  {
    id: 28,
    title: 'Aboard the Outbound Light',
    text: 'To be continued...',
    image: tbcImage,
    mode: 'On Foot',
    crewDialogue: {
      gerald: '...',
      clovis: '...'
    },
    choices: [
      { text: 'Save your game', navigateTo: '/save' }
    ]
  }
];