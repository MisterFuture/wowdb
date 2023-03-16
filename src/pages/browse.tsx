import htmlHead from "./html_utils"
import Image from "next/image"

import React, { useState } from 'react';
import database, {DBItem} from './api/db_access';

export default function SearchItemByName() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<DBItem[]>([]);
  
    const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const response = await fetch(`/api/db_access?searchTerm=${searchTerm}`);
      const items = await response.json();
      setResults(items);
    };
  
    return (
      <div>
        <form onSubmit={handleSearch}>
          <label>
            Search keyword:
            <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </label>
          <button type="submit">Search</button>
        </form>
        <div>
          {results.length === 0 && <p>No results found</p>}
          {results.map((item, index) => (
            <p key={index}>{item.name} - {item.icon} - {item.item_level}</p>
          ))}
        </div>
      </div>
    );
  }

