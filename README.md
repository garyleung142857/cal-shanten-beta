# Tile Efficiency Calculator (Beta)
https://mj-efficiency-cal.netlify.app/

Read this in [Chinese](./README.zh.md).

## Functionalities
- Support several rule variants (Menzu hand, Hong Kong Old Style, Riichi, Zung Yung, MCR, Taiwan, Hong Kong Taiwan Style).
- Consider improvements and average acceptance in next shanten.
- Does not consider hand value, defense, discards, or tile calls.
- Link Sharing

## Tile Efficiency Node package
Main calculation code has been moved to a [node package](https://www.npmjs.com/package/mahjong-tile-efficiency). The source code can be seen in this [repository](https://github.com/garyleung142857/mahjong-tile-efficiency).

## Statistics Provided

The Calculator provides the following statistics:

- **Shanten**: Minimum number of tiles drawn in order to reach tenpai.
- **Acceptance / Waiting**: Number of unseen tiles that advance shanten.
- **Improvement on Avg**: Consider the improvement of acceptance after drawing a tile. The weighted average of acceptance after drawing an unseen tile that is not considered accepting. This is displayed (if applicable) in bracket after acceptance number.
- **Accepting tiles next shanten**: The weighted average of acceptance after advancing shanten.
- **Speed ref**: Speed reference. Only displayed in 1- or 2-Shanten.
  - In 1-Shanten, speed ref is the approximate probability that the hand will be completed within 10 draws.
  - In 2-Shanten, speed ref is the approximate probability that the hand will be in tenpai within 3 draws.
- **Acceptance List**: List the types of tiles that are considered accepting. The number on the top left of tiles represents the acceptance number after drawing that tile.
- **Improvement List**: List the types of tiles that are considered improvement. The number on the top left of tiles represents that acceptance number after drawing that tile. Note that "improvement" only consider the number of acceptance, not speed reference.

## Ranking of results

When the input consists of 3n + 2 tiles, the hand is in discarding phase. The calculator will display the results of every possible discards, and sort them accordingly:

- Shanten number: in ascending order, then
- Speed reference (higher priority) or acceptance number: In descending order

## Colors

- Color of the left border reflects the quality of acceptance: Red = Excellent, blue = Average, green = Poor.
- Background color reflects the quality of average acceptance in the next shanten: Pink = Excellent, light blue = Average, green = Poor.
- The background will be yellow during tenpai.

## Rule variant
- Menzu hand: Only considers the basic shape (groups and a pair).
- Hong Kong Old style: Menzu + Thirteen Orphans
- Riichi: Menzu + Kokushi Musou (Thirteen Orphans) + Seven Pairs (Disallow identical pairs)
- Zung Yung: Menzu + 13 Terminals (Thirteen Orphans) + Seven Pairs (Allow identical pairs)
- MCR: Menzu + Thirteen Orphans + Seven Pairs (Allow identical pairs) + Knitted Straights + Knitted Tiles
- Taiwan: Menzu
- Hong Kong Taiwan Style: Menzu + 16 not related + 8 pairs + 13 Terminals

## Acknowledgement

- Tile font is from [萌娘百科](https://zh.moegirl.org.cn/Template:Mjs).