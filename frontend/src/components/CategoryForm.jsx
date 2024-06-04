const CategoryForm = ({
  handleDelete,
  handleSubmit,
  value,
  setValue,
  buttonText,
}) => {
  return (
    <div className="p-3 w-full md:w-[70vw] lg:w-[30vw]">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          className="text-white placeholder:text-slate-300 py-3 px-4 border rounded-lg w-full bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-900 to-slate-500"
          placeholder="Write category name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div className="flex justify-between">
          <button className="bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-slate-500 to-slate-900 text-slate-300 px-4 py-2 rounded cursor-pointer my-[1rem]">
            {buttonText}
          </button>

          {handleDelete && (
            <button
              onClick={handleDelete}
              className="bg-red-400 text-white py-2 px-8 rounded-lg hover:bg-red-600 h-fit"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
