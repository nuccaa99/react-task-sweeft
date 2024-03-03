import { useEffect, useState, useRef } from "react";


function SearchBar({ setTerm }) {

    const [state, setState] = useState("");
    const initial = useRef(true);

    useEffect(() => {
        if (initial.current) {
            initial.current = false;
            return;
        }
        const timer = setTimeout(() => {
            setTerm(state);
        }, 500);

        return () => clearTimeout(timer);
    }, [setTerm, state]);


    return (
        <div className="search_input_wrapper">
            <input type="text"
                name="search"
                className="search_input"
                placeholder='Search Images'
                onChange={(e) => { setState(e.target.value) }} />
        </div>
    )
}

export default SearchBar;