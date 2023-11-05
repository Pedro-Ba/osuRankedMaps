#### "c" = "General" in osu page; can be: 
- **recommended** (recommended difficulty),
- **converts** (includes converted beatmaps),
- **follows** (Mappers the user is subscribed to),
- **spotlights** (Spotlighted beatmaps),
- **featured_artists** (Display only featured artists in the search results),
- or **left blank** (none);

multiple values can be used by separating them with "."

#### "m" = "Mode" equivalent in the osu webpage;
- **left blank** for all modes,
- **0 through 3** for standard, taiko, catch and mania respectively.

Cannot have multiple values.

#### "s" = "Categories" in osu page, but can be surmised to be understood as "status";
- **left blank**, it defaults to "has leaderboards" equivalent (qualified, ranked, and loved),
- **any** for all statuses,
- **ranked** for ranked,
- **qualified** for qualified,
- **loved** for loved,
- **favourites** for favourites,
- **pending** for pending,
- **wip** for wip,
- **graveyard** for graveyard,
- **mine** for the maps of the current user.

Cannot have multiple values.

#### "nsfw" = Explicit content;
- **left blank** defaults to false (hides explicit content)
- **false** to hide,
- **true** to show.

Cannot have multiple values.

#### "g" = "Genre" in osu page:
- **left blank**, it is any,
- **1** for Unspecified,
- **2** for Video Game,
- **3** for Anime,
- **4** for Rock,
- **5** for Pop,
- **6** for Other,
- **7** for Novelty,
- **9** for Hip Hop,
- **10** for electronic,
- **11** for metal,
- **12** for Classical,
- **13** for Folk,
- **14** for Jazz,

this is not an error; 8 does not exist and returns nothing. (?) I have no clue what it is meant to be. 0 is also (?).

#### "l" = "Language" in osu page:
- **left blank** appears to e all,
- **1** is Unspecified,
- **2** is English,
- **3** is Japanese,
- **4** is Chinese,
- **5** is Instrumental,
- **6** is Korean,
- **7** is French,
- **8** is German,
- **9** is Swedish,
- **10** is Spanish,
- **11** is Italian,
- **12** is Russian,
- **13** is Polish,
- **14** is Other.

Cannot have multiple values.

####  "e" = "Extra" in osu page:
- **left blank** is none/doesn't matter?
- **video** for has video,
- **storyboard** for has storyboard;

can be multiple values and can be separated by a ".". (Haven't tested but should work)

#### "r" = "rank" in osu page; stands for the rank you achieved:
- **XH** for hidden SS,
- **X** for hidden S,
- **SH** for SS,
- **S** for S,
- **A** for A,
- **B** for B,
- **C** for C,
- **D** for D;

can be multiple values separated by a ".".

#### "played" = "played" in osu page; whether the user has played this map or not.
- **left blank**, it stands for "any",
- **played** for played maps and
- **unplayed** for unplayed maps only.

cannot be multiple values.

#### "q" = "query", and accepts any search values that you would normally input into the search bar. 

This includes filters that would otherwise not normally be available, such as "**Ranked=2023/10**" or "**ar=9**", or name searches such as an anime title or artist name, or bigger queries such as "**ar=8 cs=5 stars>4 stars<6**" and others; see more at [the osu wiki](https://osu.ppy.sh/wiki/en/Beatmap_search#fn-website-filters).

This is by far the most important of all the other queries because facilitating this through front-end code is exposing what is usually hidden under keyword searching only, and it also allows for the most flexibility in searching when compared to the other parameters.