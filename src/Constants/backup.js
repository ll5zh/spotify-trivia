/*
Backup songs, in case the user does not have four unique recently played tracks.
Objects were modified to contain only the required information.
*/

export const recentTracksBackup = [
  { 
    "track": {
      "album" : {
        "images" : [ {
          "url" : "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
        } ],
      },
      "artists" : [ {
        "name" : "The Weeknd",
      } ],
      "name" : "Blinding Lights",
    },
    "played_at" : "", // won't be used in caption, backup answers are incorrect
  },
  {
    "track" : {
      "album" : {
        "images" : [ {
          "url" : "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
        } ],
      },
      "artists" : [ {
        "name" : "Ed Sheeran",
      } ],
      "name" : "Shape of You",
    },
    "played_at" : "",
  },
  {
    "track" : {
      "album" : {
        "images" : [ {
          "url" : "https://i.scdn.co/image/ab67616d0000b273fc2101e6889d6ce9025f85f2",
        } ],
      },
      "artists" : [ {
        "name" : "Lewis Capaldi",
      } ],
      "name" : "Someone You Loved",
    },
    "played_at" : "",
  },
  {
    "track" : {
      "album" : {
        "images" : [ {
          "url" : "https://i.scdn.co/image/ab67616d0000b273e2e352d89826aef6dbd5ff8f",
        } ],
      },
      "artists" : [ {
        "name" : "Post Malone",
      } ],
      "name" : "Sunflower - Spider-Man: Into the Spider-Verse",
    },
    "played_at" : "",
  },
];
