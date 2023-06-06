import React, { useState, useEffect } from 'react';
import './App.css';
import 'h8k-components';

import Articles from './components/Articles';

const title = "Sorting Articles";

function App({articles}) {
    const [articlesList, setArticlesList] = useState(articles);

    const sortByVotes = () => {
        var newArticles = [];
        Object.assign(newArticles, articlesList);
        newArticles.sort((a, b) => {
          if (a.upvotes > b.upvotes) {
            return -1;
          }
          if (a.upvotes < b.upvotes) {
            return 1;
          }
          return 0;
        });
    
        setArticlesList(newArticles);
    };

    const sortByDate = () => {
        var newArticles = [];
        Object.assign(newArticles, articlesList);
        newArticles.sort((a, b) => {
          const aDate = new Date(a.date);
          const bDate = new Date(b.date);
          if (aDate > bDate) {
            return -1;
          }
          if (aDate < bDate) {
            return 1;
          }
          return 0;
        });
    
        setArticlesList(newArticles);
    };


    useEffect(() => {
        sortByVotes()
    });

    return (
        <div className="App">
            <h8k-navbar header={title}></h8k-navbar>
            <div className="layout-row align-items-center justify-content-center my-20 navigation">
                <label className="form-hint mb-0 text-uppercase font-weight-light">Sort By</label>
                <button data-testid="most-upvoted-link" className="small" onClick={sortByVotes}>Most Upvoted</button>
                <button data-testid="most-recent-link" className="small" onClick={sortByDate}>Most Recent</button>
            </div>
            <Articles articles={articlesList}/>
        </div>
    );

}

export default App;
