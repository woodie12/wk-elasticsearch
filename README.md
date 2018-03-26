# wk-elasticsearch
Research on Elasticsearch with express+react

# some note on lemur project indri and elastic search
elastic search: indexing takes longer time, support json parsing 

indri: better performance than elastic search, nearly twice the speed, support xml instead of json

for a time-based dynamic document, which needs to change in a time log, updating all the index

indri seems to have better performance 

# some notes on indri installation 
./configure blabla

make 

make install

https://lemur.sourceforge.io/indri/

cd indri

cd bin 

make a index.xml for parameter parsing 

//to specify a the parameter of a index
https://sourceforge.net/p/lemur/wiki/IndriBuildIndex%20Parameters/

./IndriBuildIndex blabla.xml

https://sourceforge.net/p/lemur/wiki/IndriRunQuery/
./IndriRunQuery 

# search engine

indexing method- 

1. build inverted index table:  

https://www.quora.com/What-is-inverted-index-It-is-a-well-known-fact-that-you-need-to-build-indexes-to-implement-efficient-searches-What-is-the-difference-between-index-and-inverted-index-and-how-does-one-build-inverted-index

build index:

https://www.cs.cmu.edu/~lemur/3.1/indexing.html

detailed explanation:

http://www.shuang0420.com/2016/10/14/Search%20Engines%E7%AC%94%E8%AE%B0%20-%20Index/
