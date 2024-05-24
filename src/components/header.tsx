import "./header.css"
// Need a plugin for typescript to use module css

type HeaderProps = {
  query: string;
  setQuery: (query: string) => void;
};

const Header = ({ query, setQuery }: HeaderProps) => {
  return (
    <header className="header">
      <input
        className="input"
        value={query}
        placeholder="Busca un Pokemon"
        onChange={(event) => setQuery(event.target.value.trim())}
        type="text"
      />
    </header>
  );
};

export default Header;
