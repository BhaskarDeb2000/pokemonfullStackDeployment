# Basic of Fullstack

## Node Backend

[BackendAPICall](./backend/index.js)
<li>API endpoint: /name is an APi req endPoint - line 28
<li>The endpoint is expected to request a query from the queryParameter which in this case is pokemonName  - line 30

## React FrontEnd

[PokemonData](./client/src/Components/PokemonData.js)
<ul>
<li>Response is a variable that fetches data from the comeFromParentComponent that has been sent form Parent Component query of the url - line 30</li>
</ul>

[App](./client/src/App.js)
<ul>
<li>name useState has a default value "Alak" - line 10</li>
<li>PokemonData is the childComponent which is fetching data from the parent as comeFromParentComponent variable whose default value is Alak - line 15</li>
</ul>