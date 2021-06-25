const categoryData = [
  { name: 'Action (set A)', id: 1 },
  { name: 'Action (set B)', id: 2 },
  { name: 'Animal (set A)', id: 3 },
  { name: 'Animal (set B)', id: 4 },
  { name: 'Clothes', id: 5 },
  { name: 'Emotions', id: 6 }
  ];

const cardSets = [
  {
    id: 1, 
    items: [
      {
        id: 1,
        word: 'cry',
        translation: 'плакать',
        image: 'img/cry.jpg',
        audioSrc: 'audio/cry.mp3'
      },
      {
        id: 2,
        word: 'dance',
        translation: 'танцевать',
        image: 'img/dance.jpg',
        audioSrc: 'audio/dance.mp3'
      },
      {
        id: 3,
        word: 'dive',
        translation: 'нырять',
        image: 'img/dive.jpg',
        audioSrc: 'audio/dive.mp3'
      },
      {
        id: 5,
        word: 'draw',
        translation: 'рисовать',
        image: 'img/draw.jpg',
        audioSrc: 'audio/draw.mp3'
      },
      {
        id: 6,
        word: 'fish',
        translation: 'ловить рыбу',
        image: 'img/fish.jpg',
        audioSrc: 'audio/fish.mp3'
      },
      {
        id: 7,
        word: 'fly',
        translation: 'летать',
        image: 'img/fly.jpg',
        audioSrc: 'audio/fly.mp3'
      },
      {
        id: 8,
        word: 'hug',
        translation: 'обнимать',
        image: 'img/hug.jpg',
        audioSrc: 'audio/hug.mp3'
      },
      { 
        id: 9,
        word: 'jump',
        translation: 'прыгать',
        image: 'img/jump.jpg',
        audioSrc: 'audio/jump.mp3'
      }
    ]
  },

  {
    id: 2, 
    items: [
      {
        id: 10,
        word: 'open',
        translation: 'открывать',
        image: 'img/open.jpg',
        audioSrc: 'audio/open.mp3'
      },
      { 
        id: 11,
        word: 'play',
        translation: 'играть',
        image: 'img/play.jpg',
        audioSrc: 'audio/play.mp3'
      },
      {
        id: 12,
        word: 'point',
        translation: 'указывать',
        image: 'img/point.jpg',
        audioSrc: 'audio/point.mp3'
      },
      {
        id: 13,
        word: 'ride',
        translation: 'ездить',
        image: 'img/ride.jpg',
        audioSrc: 'audio/ride.mp3'
      },
      {
        id: 14,
        word: 'run',
        translation: 'бегать',
        image: 'img/run.jpg',
        audioSrc: 'audio/run.mp3'
      },
      {
        id: 15,
        word: 'sing',
        translation: 'петь',
        image: 'img/sing.jpg',
        audioSrc: 'audio/sing.mp3'
      },
      {
        id: 16,
        word: 'skip',
        translation: 'пропускать, прыгать',
        image: 'img/skip.jpg',
        audioSrc: 'audio/skip.mp3'
      },
      {
        id: 17,
        word: 'swim',
        translation: 'плавать',
        image: 'img/swim.jpg',
        audioSrc: 'audio/swim.mp3'
      }
    ]
  },

  {
    id: 3, 
    items: [
      {
        id: 18,
        word: 'cat',
        translation: 'кот',
        image: 'img/cat.jpg',
        audioSrc: 'audio/cat.mp3'
      },
      {
        id: 19,
        word: 'chick',
        translation: 'цыплёнок',
        image: 'img/chick.jpg',
        audioSrc: 'audio/chick.mp3'
      },
      {
        id: 20,
        word: 'chicken',
        translation: 'курица',
        image: 'img/chicken.jpg',
        audioSrc: 'audio/chicken.mp3'
      },
      {
        id: 21,
        word: 'dog',
        translation: 'собака',
        image: 'img/dog.jpg',
        audioSrc: 'audio/dog.mp3'
      },
      {
        id: 22,
        word: 'horse',
        translation: 'лошадь',
        image: 'img/horse.jpg',
        audioSrc: 'audio/horse.mp3'
      },
      {
        id: 23,
        word: 'pig',
        translation: 'свинья',
        image: 'img/pig.jpg',
        audioSrc: 'audio/pig.mp3'
      },
      {
        id: 24,
        word: 'rabbit',
        translation: 'кролик',
        image: 'img/rabbit.jpg',
        audioSrc: 'audio/rabbit.mp3'
      },
      {
        id: 25,
        word: 'sheep',
        translation: 'овца',
        image: 'img/sheep.jpg',
        audioSrc: 'audio/sheep.mp3'
      }
    ]
  },

  {
    id: 4, 
    items: [
      {
        id: 26,
        word: 'bird',
        translation: 'птица',
        image: 'img/bird.jpg',
        audioSrc: 'audio/bird.mp3'
      },
      {
        id: 27,
        word: 'fish',
        translation: 'рыба',
        image: 'img/fish1.jpg',
        audioSrc: 'audio/fish.mp3'
      },
      {
        id: 28,
        word: 'frog',
        translation: 'жаба',
        image: 'img/frog.jpg',
        audioSrc: 'audio/frog.mp3'
      },
      {
        id: 29,
        word: 'giraffe',
        translation: 'жирафа',
        image: 'img/giraffe.jpg',
        audioSrc: 'audio/giraffe.mp3'
      },
      {
        id: 30,
        word: 'lion',
        translation: 'лев',
        image: 'img/lion.jpg',
        audioSrc: 'audio/lion.mp3'
      },
      {
        id: 31,
        word: 'mouse',
        translation: 'мышь',
        image: 'img/mouse.jpg',
        audioSrc: 'audio/mouse.mp3'
      },
      {
        id: 32,
        word: 'turtle',
        translation: 'черепаха',
        image: 'img/turtle.jpg',
        audioSrc: 'audio/turtle.mp3'
      },
      {
        id: 33,
        word: 'dolphin',
        translation: 'дельфин',
        image: 'img/dolphin.jpg',
        audioSrc: 'audio/dolphin.mp3'
      }
    ],
  },
  {
    id: 5, 
    items: [
      {
        id: 34,
        word: 'skirt',
        translation: 'юбка',
        image: 'img/skirt.jpg',
        audioSrc: 'audio/skirt.mp3'
      },
      {
        id: 35,
        word: 'pants',
        translation: 'брюки',
        image: 'img/pants.jpg',
        audioSrc: 'audio/pants.mp3'
      },
      {
        id: 36,
        word: 'blouse',
        translation: 'блузка',
        image: 'img/blouse.jpg',
        audioSrc: 'audio/blouse.mp3'
      },
      {
        id: 37,
        word: 'dress',
        translation: 'платье',
        image: 'img/dress.jpg',
        audioSrc: 'audio/dress.mp3'
      },
      {
        id: 38,
        word: 'boot',
        translation: 'ботинок',
        image: 'img/boot.jpg',
        audioSrc: 'audio/boot.mp3'
      },
      {
        id: 39,
        word: 'shirt',
        translation: 'рубашка',
        image: 'img/shirt.jpg',
        audioSrc: 'audio/shirt.mp3'
      },
      {
        id: 40,
        word: 'coat',
        translation: 'пальто',
        image: 'img/coat.jpg',
        audioSrc: 'audio/coat.mp3'
      },
      {
        id: 41,
        word: 'shoe',
        translation: 'туфли',
        image: 'img/shoe.jpg',
        audioSrc: 'audio/shoe.mp3'
      }
    ]
  },
  {
    id: 6, 
    items: [
      {
        id: 42,
        word: 'sad',
        translation: 'грустный',
        image: 'img/sad.jpg',
        audioSrc: 'audio/sad.mp3'
      },
      {
        id: 43,
        word: 'angry',
        translation: 'сердитый',
        image: 'img/angry.jpg',
        audioSrc: 'audio/angry.mp3'
      },
      {
        id: 44,
        word: 'happy',
        translation: 'счастливый',
        image: 'img/happy.jpg',
        audioSrc: 'audio/happy.mp3'
      },
      { 
        id: 45,
        word: 'tired',
        translation: 'уставший',
        image: 'img/tired.jpg',
        audioSrc: 'audio/tired.mp3'
      },
      {
        id: 46,
        word: 'surprised',
        translation: 'удивлённый',
        image: 'img/surprised.jpg',
        audioSrc: 'audio/surprised.mp3'
      },
      {
        id: 47,
        word: 'scared',
        translation: 'испуганный',
        image: 'img/scared.jpg',
        audioSrc: 'audio/scared.mp3'
      },
      {
        id: 48,
        word: 'smile',
        translation: 'улыбка',
        image: 'img/smile.jpg',
        audioSrc: 'audio/smile.mp3'
      },
      {
        id: 49,
        word: 'laugh',
        translation: 'смех',
        image: 'img/laugh.jpg',
        audioSrc: 'audio/laugh.mp3'
      }
    ]
  }
];





export { cardSets, categoryData };