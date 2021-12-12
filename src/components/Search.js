import React, {useState, useEffect} from 'react'
import List from './List';
import axios from 'axios'

function Search() {
    const [value, setValue] = useState("");
    const [result, setResult] = useState([]);

    useEffect(() => {
        let timerId = null;
        if(value) {
            timerId = setTimeout(async () => {
            const {data} = await axios.get("https://en.wikipedia.org/w/api.php", {
            params: {
                action: 'query',
                list: 'search',
                origin: '*',
                format: 'json',
                srsearch: value
            }
            });
            setResult(data.query.search);
        }, 1000);
    }
        return ()=> {
            clearTimeout(timerId);
        }
    }, [value]);   


    return (
        <>
            <form className="ui form">
                <input 
                    type='text'
                    placeholder='Search Wikipedia ...'
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                />
            </form>
            <List results = {result}/>
        </>
    )
}

export default Search
