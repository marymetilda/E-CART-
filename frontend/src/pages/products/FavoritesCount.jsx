import { useSelector } from "react-redux";

const FavoritesCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const FavoriteCount = favorites.length;

  return (
    <div className="absolute left-2 top-8">
      {FavoriteCount > 0 && (
        <span className="px-1.5 py-0 text-sm text-white bg-rose-400 rounded-full">
          {FavoriteCount}
        </span>
      )}
    </div>
  );
};

export default FavoritesCount;
