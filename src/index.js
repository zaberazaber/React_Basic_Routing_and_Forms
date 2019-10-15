import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, withRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import AddAuthorForm from './AddAuthorform';
import { shuffle, sample } from 'underscore'

const authors = [
  {
    name: 'Mark Twain',
    imageUrl: 'images/authors/marktwain.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['The Adventures of Huckleberry Finn']
  },
  {
    name: 'Joseph Conrad',
    imageUrl: 'images/authors/josephconrad.png',
    imageSource: 'Wikimedia Commons',
    books: ['Heart of Darkness']
  },
  {
    name: 'J.K. Rowling',
    imageUrl: 'images/authors/jkrowling.jpg',
    imageSource: 'Wikimedia Commons',
    imageAttribution: 'Daniel Ogren',
    books: ['Harry Potter and the Sorcerers Stone']
  },
  {
    name: 'Stephen King',
    imageUrl: 'images/authors/stephenking.jpg',
    imageSource: 'Wikimedia Commons',
    imageAttribution: 'Pinguino',
    books: ['The Shining', 'IT']
  },
  {
    name: 'Charles Dickens',
    imageUrl: 'images/authors/charlesdickens.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['David Copperfield', 'A Tale of Two Cities']
  },
  {
    name: 'William Shakespeare',
    imageUrl: 'images/authors/williamshakespeare.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']
  }
];


function getTurnData(authors) {
  const allBooks = authors.reduce(function (p, c, i) {
    return p.concat(c.books)
  }, []);
  const fourRandonBooks = shuffle(allBooks).slice(0, 4);
  const answer = sample(fourRandonBooks);
  return {
    books: fourRandonBooks,
    author: authors.find((authors) =>
      authors.books.some((title) =>
        title === answer))
  }
}


function onAnswerSelected(answer) {
  const isCorrect = state.turnData.author.books.some((book) => book === answer);
  state.highlight = isCorrect ? 'correct' : 'wrong';
  render();
}

function resetState(){
   return { turnData: getTurnData(authors),
    highlight: ''
}
}     

let state = resetState();

function MainApp() {
  //have to create an intermediate component so that we can provide props as we cant specify props in routing 
  //so instead of directly routing  to the app component we are routing to this intermediate component 
  return <App {...state} 
  onAnswerSelected={onAnswerSelected}
  onContinue ={ () => {
    state = resetState();
    render();
  } } />
}

//withRouter is a function that allow us to give components access to a number of useful values
// withRouter is a function that expect an argument which is a react componet --> ({xyz})
const AuthorWrapper = withRouter(({ history }) =>
  <AddAuthorForm onAddAuthor={(author) => {
    authors.push(author)
    history.push('/')
  }} />)


function render() {
  ReactDOM.render(
    <BrowserRouter>
      <React.Fragment>
        <Route exact path="/" component={MainApp} />
        {/* <Route path="/add" component={AddAuthorForm} /> intermediate component authorWrapper is declared to add props */}
        <Route path="/add" component={AuthorWrapper} />
      </React.Fragment>
    </BrowserRouter>, document.getElementById('root')
  );
}

render();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.

serviceWorker.unregister();
