import { useState } from "react";
import css from "components/styles.module.css";
import PropTypes from "prop-types";


export default function Searchbar({onSubmit}) {
        
        const [query, setQuery] = useState("");
        

        const queryHandle = (e) => {
                setQuery (e.target.value.toLowerCase());
        };

        const onFormSubmit = (e) => {
                e.preventDefault();

                if (query.trim() === "") {
                        alert ("Pictures not found or please fill the searchbar");
                        return;
                }

                onSubmit (query);
                
                window.scrollTo ({
                        top:0,
                        behavior:"smooth",});
        };


        return (
                <header className={css.Searchbar}>
                        <form className={css.SearchForm} onSubmit={onFormSubmit}>
                                <button type="submit" className={css.SearchFormButton}>
                                                <span className={css.SearchFormButtonLabel}>Search</span>
                                </button>
                                <input
                                                className={css.SearchFormInput}
                                                type="text"
                                                onChange={queryHandle}
                                                autoComplete="off"
                                                autoFocus
                                                placeholder="Search images and photos"
                                />
                        </form>
                </header>
        );
};

Searchbar.propTypes = {
        onSubmit: PropTypes.func.isRequired,
};
