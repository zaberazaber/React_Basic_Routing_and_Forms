import React from 'react';
import './AddAuthorForm.css'

class AuthorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageUrl: '',
            books: [],
            bookTemp: ''
        };
        //for onFieldChange to work we have to bind this.
        this.onFieldChange = this.onFieldChange.bind(this);
        //what the above line does is it makes sure that whenever onFiledChange id called the value of this in the method 
        // onFiledChange()-->  this.setState is same as the value of this in the constructor --> .bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddBook = this.handleAddBook.bind(this);
    }

    // to set state so that we can enter value in form 
    onFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    //to prevent the default behaviour of submit button and to add data
    handleSubmit(event) {
        event.preventDefault();
        //we need to add a binding in the constructor for this 
        this.props.onAddAuthor(this.state)
    }


    //for adding books into the array of books
    handleAddBook(event) {
        this.setState({
            books: this.state.books.concat([this.state.bookTemp]),
            bookTemp: ''
        });
    }

    render() {
        return <form onSubmit={this.handleSubmit}>
            <div className="AddAuthorForm__input">
                <label htmlFor="name">Name</label>
                {/* because onFieldChange  uses this we have to make sure that in the constructor we bind this */}
                <input type="text" name="name" value={this.state.name} onChange={this.onFieldChange} />
            </div>

            <div className="AddAuthorForm__input">
                <label htmlFor="imageUrl">Image URL</label>
                {/* just providing the value={this.state.xyz}  in the below line will just bind the form field with the state but to change this state we have to provide a 
                setState on some event like here we have provided the setState on onChange method by calling a onFieldChange function */}
                <input type="text" name="imageUrl" value={this.state.imageUrl} onChange={this.onFieldChange} />
            </div>

            <div className="AddAuthorForm__input">
                <label htmlFor="bookTemp">Books</label>
                {/* if we dont provide the key property in the below line there will be a warning that for each child of an array or an iterator should have a unique key prop */}
                {/* the below line is for rendering the current contents of the book array
                here each book will be mapped to a paragraph containing the name of the book */}
                {this.state.books.map((book) => <p key={book}>{book}</p>)}
                <input type="text" name="bookTemp" value={this.state.bookTemp} onChange={this.onFieldChange} />
                <input type="button" value="+" onClick={this.handleAddBook} />
            </div>

            <input type="submit" value="Add" />
        </form>;
    }
}


function AddAuthorForm({ match, onAddAuthor }) {
    return <div className="AddAuthorForm">
        <h1>Add Author</h1>
        <AuthorForm onAddAuthor={onAddAuthor} />
    </div>;
}

export default AddAuthorForm;
