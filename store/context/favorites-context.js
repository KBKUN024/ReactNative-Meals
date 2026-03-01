import { createContext } from "react";
import { useImmer } from "use-immer";

export const FavoritesContext = createContext({
  ids: [],
  addFavorite: (id) => {},
  removeFavorite: (id) => {},
});

export default function FavoritesContextProvider({ children }) {
  const [favoriteMealIds, updateFavoriteMealIds] = useImmer([]);

  function addFavorite(id) {
    updateFavoriteMealIds((draft) => {
      draft.push(id);
    });
  }

  function removeFavorite(id) {
    updateFavoriteMealIds((draft) => {
      const index = draft.indexOf(id);
      if (index !== -1) {
        draft.splice(index, 1);
      }
    });
  }

  const value = {
    ids: favoriteMealIds,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
