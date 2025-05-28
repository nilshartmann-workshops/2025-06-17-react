export function createCards() {
  return [
    {
      id: "C1",
      message:
        "Wishing you a fun-filled vacation! May your days be full of adventure and relaxation.",
      title: "Sun, sand, and sea!",
      image: "01.png",
      likes: 30,
    },
    {
      id: "C2",
      message: "Happy Birthday! May your special day be as amazing as you are.",
      title: "Blow out the candles!",
      image: "02.png",
      likes: 85,
    },
    {
      id: "C3",
      message:
        "Pack your bags and get ready for the adventure of a lifetime! Have a fantastic vacation!",
      title: "Relaaaaax!",
      image: "03.png",
      likes: 45,
    },
    {
      id: "C4",
      message:
        "Wishing you a birthday filled with laughter, joy, and lots of cake!",
      title: "Make a wish!",
      image: "04.png",
      likes: 72,
    },
    {
      id: "C5",
      message:
        "Take a break, breathe in the fresh air, and make unforgettable memories.",
      title: "Enjoy your getaway!",
      image: "05.png",
      likes: 38,
    },
    {
      id: "C6",
      message:
        "Another year older, another year of amazing experiences ahead! Happy Birthday!",
      title: "Celebrate in style!",
      image: "06.png",
      likes: 90,
    },
  ];
}

export function createComments() {
  return [
    {
      id: "CM1",
      author: "Alice",
      text: "This sounds like the perfect vacation!",
      cardId: "C1",
    },
    { id: "CM2", author: "Bob", text: "I love the beach vibes!", cardId: "C1" },
    {
      id: "CM3",
      author: "Charlie",
      text: "Happy Birthday, superstar!",
      cardId: "C2",
    },
    {
      id: "CM4",
      author: "Dana",
      text: "Wishing you all the best!",
      cardId: "C2",
    },
    {
      id: "CM5",
      author: "Eli",
      text: "Can't wait to travel again!",
      cardId: "C3",
    },
    { id: "CM6", author: "Fay", text: "Adventure time!", cardId: "C3" },
    {
      id: "CM7",
      author: "Gina",
      text: "Hope you have lots of cake!",
      cardId: "C4",
    },
    {
      id: "CM8",
      author: "Hank",
      text: "Best wishes on your birthday!",
      cardId: "C4",
    },
    {
      id: "CM9",
      author: "Ivy",
      text: "Fresh air and good memories, perfect combo!",
      cardId: "C5",
    },
    {
      id: "CM10",
      author: "Jack",
      text: "Relax and enjoy every second!",
      cardId: "C5",
    },
    {
      id: "CM11",
      author: "Kara",
      text: "Cheers to another amazing year!",
      cardId: "C6",
    },
    { id: "CM12", author: "Leo", text: "Let's party!", cardId: "C6" },
  ];
}
