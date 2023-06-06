import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {applyPolyfills, defineCustomElements} from 'h8k-components/loader';

const PART_1 = {"id":"8947b61f-4386-4ead-ab52-00200a446140","title":"Hello, world!","version":4.1,"public":true};
const PART_2 = {"id":"8947b61f-4386-4ead-ab52-00200a446140","title":"Hello, world!","version":4.1,"public":true,"properties":{"icon":"🎉","width":"full","typeface":"sans-serif"}};
const PART_3 = {"id":"8947b61f-4386-4ead-ab52-00200a446140","title":"Hello, world!","version":4.1,"history":{"597b41a1-1e31-4f7d-8763-01f244eaf5f7":{"date":"3 Feb 2022","changes":{"title":"Hello, world! v2"}},"3d4a2ceb-e787-479e-8087-3aaaf0d16e61":{"date":"29 Jan 2022","changes":{"icon":"🚧"}},"678f83a8-230d-4c3c-92cf-b3cacafb0a0a":{"date":"22 Jan 2022","changes":{"public":false}}},"public":true,"properties":{"icon":"🎉","width":"full","typeface":"sans-serif"}};
const PART_4 = {"id":"8947b61f-4386-4ead-ab52-00200a446140","title":"Hello, world!","version":4.1,"collaborators":["ecb5c324-6e4c-4348-940d-19b9d9d42e78","6a1401e9-a878-4eac-98fd-5eeabf414332","8fa9f385-3e65-4899-a7d0-206b3f4b28bf","328bd6d9-eb59-45df-a230-be32ebd003b7","032bba7f-2ee5-4518-946f-955ada6fdc34","09941c45-17b8-431d-a86c-d578484ec261"],"history":{"597b41a1-1e31-4f7d-8763-01f244eaf5f7":{"date":"3 Feb 2022","changes":{"title":"Hello, world! v2"}},"3d4a2ceb-e787-479e-8087-3aaaf0d16e61":{"date":"29 Jan 2022","changes":{"icon":"🚧"}},"678f83a8-230d-4c3c-92cf-b3cacafb0a0a":{"date":"22 Jan 2022","changes":{"public":false}}},"public":true,"properties":{"icon":"🎉","width":"full","typeface":"sans-serif"}};

const OBJECT = PART_4;

ReactDOM.render(<App jsonObject={OBJECT} />, document.getElementById('root'));
registerServiceWorker();

applyPolyfills().then(() => {
    defineCustomElements(window);
})
