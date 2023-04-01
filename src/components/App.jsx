import { useState, useEffect } from "react";
import Searchbar from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import Modal from "./Modal/Modal";
import css from "components/styles.module.css";

const URL = "https://pixabay.com/api/";
const API_KEY = "33451170-da7868fa9d2d9191c176f5359";

function App ( ) {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("idle");
  const [url, setUrl] = useState(null);
  const [tags, setTags] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }

    fetch(
      `${URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.hits.length > 0) {
          setResults ((prevResults) => [...prevResults, ...data.hits.map((hit) => {
            return {
              id: hit.id,
              webformatURL: hit.webformatURL,
              tags: hit.tags,
              largeImageURL: hit.largeImageURL,
            };
          }),
        ]);
          setStatus("idle");
        } else {
            setStatus ("idle");
            alert ("No more results");
            return;
        }
      })
      .catch ((error) => console.log(error));
  }, [query, page]);


  const submitHandle = (submitQuary) => {
    if (submitQuary.trim() === query) { 
      return; 
    }
    setQuery (submitQuary);
    setResults ([]);
    setPage (1);
    setStatus("pending");
  };


  const onLoadMoreHandle = () => {
    setPage( (page) => page + 1 );
  };


  const openModal = ({ bigImg, alt }) => {
    setUrl(bigImg);
    setTags(alt);
    };

    
  const closeModal = () => {
    setUrl(null);
    setTags(null);
  };

  return (
      <div className={css.App}>
        <Searchbar onSubmit={submitHandle} />
        {results.length > 0 && (
          <ImageGallery gallery={results} onClick={openModal} />
        )}
        {status === "pending" && <Loader />}
        {results.length > 0 && (
          <Button onLoadMore={onLoadMoreHandle} />
        )}
        {url && (
          <Modal src={{url, tags}} onClose={closeModal} />
        )}
      </div>
  );
}

export default App;