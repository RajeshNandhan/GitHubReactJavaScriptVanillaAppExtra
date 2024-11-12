import { useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import fetchDelete from '../shared/apiFetch/fetchDelete';
import BookDataContext from '../shared/context/BookDataContext';
import BookSearch from './BookSearch';
import { Environments } from '../shared/environment/environment';

const BookList = () => {
    const { 
      bookItems, setBookItems, bookFetchError, setBookFetchError, isBookLoading, setIsBookLoading,
      search, setSearch, searchResults, setSearchResults
    } = useContext(BookDataContext);

    const [bookDeleteError, setBookDeleteError] = useState(null);

    const handleDelete = async (bookId) => {

      setBookDeleteError(null);
      try {
        const deleteRequestUrl = `${Environments.apiAdditionalServiceEndPoint}book/${bookId}`;
        await fetchDelete(deleteRequestUrl);
        const newItems = bookItems.filter(item => item.bookId !== bookId);
        setBookItems(newItems);
      } catch (err) {
        setBookDeleteError(err.message);
      }
    }

    return (
        <main>
           {bookDeleteError && <p className="statusMsg" style={{ color: "red" }}>{bookDeleteError}</p>}
           {isBookLoading && <p className="statusMsg">Loading books data...</p>}
           {!isBookLoading && bookFetchError && <p className="statusMsg" style={{ color: "red" }}>{bookFetchError}</p>}
           {!isBookLoading && !bookFetchError && searchResults && (
            <>
              <BookSearch />
              <table>
              <thead>
                  <tr>
                  <th>Book Name</th>
                  <th>Category</th>
                  <th>Edition</th>
                  <th>Price</th>
                  <th></th>
                  <th></th>
                  </tr>
              </thead>
              <tbody>
                  {searchResults.map((item) => (
                  <tr className="item" key={item.id}>
                      <td>{item.bookName}</td>
                      <td>{item.bookCategory}</td>
                      <td>{item.edition}</td>
                      <td>{item.price}</td>
                      <td>{item.image}</td>
                      <td>
                        <Link to={`/book/${item.bookId}`}><FaEdit title="Press to Edit book"/></Link>
                      </td>
                      <td>
                        <FaTrashAlt role='button' tabIndex="0" title="Press to Delete book"
                        onClick={() => handleDelete(item.bookId)}/>
                      </td>
                  </tr>
                  ))}
              </tbody>
              </table>
            </>
            )}
        </main>
    )
}

export default BookList