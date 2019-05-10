# :chicken: :arrow_right: :helicopter:
### A Cards Against Humanity Clone.
[![CircleCI](https://circleci.com/gh/olback/cah.svg?style=svg)](https://circleci.com/gh/olback/cah)
> _Cards Against Humanity is a party game for horrible people. Unlike most of the party games you've played before, Cards Against Humanity is as despicable and awkward as you and your friends._
> _The game is simple. Each round, one player asks a question from a black card, and everyone else answers with their funniest white card._

\- Cards Against Humanity LLC.

For instructions on how to play, read the [official rules](https://s3.amazonaws.com/cah/CAH_Rules.pdf).
This version implements the 'Packing Heat' house rule.

## :fire: Key features:

-   +34 000 Playing cards.
-   No logging at all.
-   No accounts.
-   Blank cards.
-   No language filters. :underage:
-   Easter eggs. :egg:

## FAQ

### Why?

I haven't found anywhere to play Cards Against Humanity online that's good enough. There are sites like [pretendyoure.xyz](https://pretendyoure.xyz/zy/) and [azala.info](https://azala.info/static/index.html) but they are limited in some way. pretendyoure.xyz does not allow blank cards and azala.info has a player/game limit.

### Why this language/framework?

Because Angular and Typescript are what I'm most familiar with. :man_shrugging:

### Can i host my own verison of this?

Yes. Clone the repository and run `scripts/setup.sh`.
You should now have the game running on port 5000. For more info see [setup.md](setup.md).

### Why is it called _Chickens Attack Helicopters_?

> "We own the name "Cards Against Humanity," so you have to call your crappy thing something else."

\- Cards Against Humanity LLC.

## Installation

[cah.ninja](https://cah.ninja/) is the main URL for the game but if you want to run your own version of the game you can do so.
[setup.md](setup.md) explains how to set up your own version of the game on GNU/Linux.

## Contributing

### Card packs

All card packs are gathered from external sources.
If you think we're missing one you can add it as a PostgreSQL file and store it in `scripts/postgres/data/`.  
Remember to use the same layout for the PostgreSQL file as us.

### Acronyms

All CAH acronyms are stored in `scripts/postgres/sql/acronyms.psql`.
If you want to add more, edit that file and create a [pull request](https://github.com/olback/cah/pulls).

## Enjoy! :tada:
