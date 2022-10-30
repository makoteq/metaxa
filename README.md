# metaxa :cocktail:
CLI made for fast reading, showing only one word at a time.

## :point_down: demo
![demo](https://user-images.githubusercontent.com/37949904/198865452-bbc3437d-e4bf-4680-8d55-2c6b583e3efc.png)

## :floppy_disk: Installation
``` bash
npm i -g metaxa
```

## :electric_plug: Usage 
1. Show text from file in < file_path > with delay between words in < delay > (default 250WPM)
``` bash
metaxa start <path> [<delay>]
```
**or**
``` bash
npx metaxa start <path> [<delay>]
```
_where < path > is a path to your .txt file with text to read and < delay > is the speed of the words in words per minute (WPM)_

2. Show number of words, sentences, and absolute path of file in < file_path >
``` bash
metaxa stats <file_path>
```
3. Show text from text wrapped with '' or "" in < text >, with delay between words in < delay > (default 250WPM)
``` cmd
metaxa read <text> [<delay>] 
```
## :film_projector: See it in action!
![demo](https://user-images.githubusercontent.com/54977705/195251134-3b560b51-fd65-4e3f-9841-546a75ecd27e.gif)

## :raised_hands: Contributing 
Contributions are welcome, check [Issues!](https://github.com/makoteq/metaxa/issues)</br></br>
**If you like the project make sure to hit :star:**
## Thanks to these amazing people
<a href="https://github.com/makoteq/metaxa/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=makoteq/metaxa&&max=817" />
</a>

## :page_with_curl: License 
This project is under [MIT](https://github.com/makoteq/metaxa/blob/main/LICENSE) license
