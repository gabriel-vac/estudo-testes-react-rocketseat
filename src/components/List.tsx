import { useState } from "react";

type ListProps = {
  initialitems: string[];
};

function List({ initialitems }: ListProps) {
  const [newItem, setNewItem] = useState("");
  const [list, setList] = useState(initialitems);

  function addToList() {
    setTimeout(() => {
      setList((state) => [...state, newItem]);
    }, 1000);
  }

  function removeFromList(itemRemoved: string) {
    setTimeout(() => {
      setList((state) => state.filter((item) => item !== itemRemoved));
    }, 500);
  }

  return (
    <>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Novo item"
      />
      <button onClick={addToList}>adicionar</button>
      <ul>
        {list.map((item) => (
          <li key={item}>
            {item}
            <button onClick={() => removeFromList(item)}>remover</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default List;
