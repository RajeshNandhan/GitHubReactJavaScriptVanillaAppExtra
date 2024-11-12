import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaSave, FaBackspace } from "react-icons/fa";
import fetchPut from "../shared/apiFetch/fetchPut";
import BookDataContext from "../shared/context/BookDataContext";
import { Environments } from "../shared/environment/environment"

const BookEdit = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const {bookItems, setBookItems} = useContext(BookDataContext);
    const selectedBook = bookItems.find(item => (item.bookId).toString() === id);

    const [bookEditError, setBookEditError] = useState(null);
    //BOOK Individual property
    const [editBookName, setEditBookName] = useState('');
    const [editBookCategory, setEditBookCategory] = useState('');
    const [editEdition, setEditEdition] = useState('');
    const [editPrice, setEditPrice] = useState('');
    const [editImage, setEditImage] = useState('');

    //UPDATE BOOK Individual property with useState based on selectedBook
    //Triggers On Load
    useEffect(() => {
        if (selectedBook) {
            setEditBookName(selectedBook.bookName);
            setEditBookCategory(selectedBook.bookCategory);
            setEditEdition(selectedBook.edition);
            setEditPrice(selectedBook.price);
            setEditImage(selectedBook.image);
            //console.log('Call on useEffect to set values from BookEdit');
        }
    }, [selectedBook, setEditBookName, setEditBookCategory, setEditEdition, setEditPrice, setEditImage])

    const handleSaveClick = async () => {
        setBookEditError(null);
        //RECREATE BOOK FOR Update 
        //First create a copy of untouched selectedBook 
        //Second Update properties of copied object with useState Value
        let updatedBook = JSON.parse(JSON.stringify(selectedBook));
        updatedBook.bookName = editBookName;
        updatedBook.bookCategory = editBookCategory;
        updatedBook.edition = editEdition;
        updatedBook.price = editPrice;
        updatedBook.image = editImage;
        
        const updateRequestUrl = `${Environments.apiAdditionalServiceEndPoint}book/${id}`;
        try {
            await fetchPut(updateRequestUrl, updatedBook);
            setBookItems(bookItems.map(post => post.bookId === updatedBook.bookId ? { ...updatedBook } : post));
            resetSelectedBookForEMpty();
            navigate('/book');
        } catch(err){
            //console.log('--> Call to handleSaveClick with catch err');
            setBookEditError(err.message);
        }
    };

    const handleCancelClick = (e) => {
        resetSelectedBookForEMpty();
        navigate('/book');
    };

    const resetSelectedBookForEMpty = () => {
        setEditBookName('');
        setEditBookCategory('');
        setEditEdition('');
        setEditPrice('');
        setEditImage('');
    }

    return (
        <main>
            {bookEditError && <p className="statusMsg" style={{ color: "red" }}>{bookEditError}</p>}
            {selectedBook ? (
                <form className="bookEditForm" onSubmit={(e) => { e.preventDefault();}}>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <label htmlFor="bookName">Name</label>
                                </td>
                                <td>
                                    <input name="bookName" type="text" required value={editBookName} onChange={(e) => setEditBookName(e.target.value)}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <label htmlFor="bookCategory">Category</label>
                                </td>
                                <td>
                                    <input name="bookCategory" type="text" required value={editBookCategory} onChange={(e) => setEditBookCategory(e.target.value)}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <label htmlFor="edition">Edition</label>
                                </td>
                                <td>
                                    <input name="edition" type="text" required value={editEdition} onChange={(e) => setEditEdition(e.target.value)}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <label htmlFor="price">Price</label>
                                </td>
                                <td>
                                    <input name="price" type="text" required value={editPrice} onChange={(e) => setEditPrice(e.target.value)}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <label htmlFor="image">Image</label>
                                </td>
                                <td>
                                    <input name="image" type="text" required value={editImage} onChange={(e) => setEditImage(e.target.value)}/>
                                </td>
                            </tr>
                            <tr className="item">
                                <td style={{columnSpan : 2}}>
                                    <FaBackspace role='button' onClick={handleCancelClick} 
                                        tabIndex="1" name="Cancel" title="Press to Cancel"/>
                                    <FaSave role='button' onClick={handleSaveClick} tabIndex="0" 
                                        name="Save" title="Press to Save changes"/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
         ): (
            <p style={{ marginTop: '2rem' }}>Your list is empty.</p>
        )}</main>
    )
}

export default BookEdit;