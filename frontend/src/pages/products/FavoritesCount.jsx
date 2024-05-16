import { useSelector } from "react-redux";

const FavoritesCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const FavoriteCount = favorites.length;

  return (
    <div className="absolute left-2 top-8">
      {FavoriteCount > 0 && (
        <span className="px-1 py-0 text-sm text-white bg-sky-500 rounded-full">
          {FavoriteCount}
        </span>
      )}
    </div>
  );
};

export default FavoritesCount;
