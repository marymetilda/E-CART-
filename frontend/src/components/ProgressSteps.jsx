const ProgressSteps = ({ step1, step2, step3 }) => {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center lg:gap-x-4">
      <div
        className={`${step1 ? "text-green-500 flex items-center justify-center gap-4 lg:gap-0 lg:flex-col" : "text-gray-300"}`}
      >
        <span className="ml-2">Login</span>
        <div className="mt-2 text-lg text-center">✅</div>
      </div>
      {step2 && (
        <>
          {step1 && (
            <div className="h-0.5 w-[10rem] bg-green-500 hidden lg:block"></div>
          )}
          <div
            className={`${step1 ? "text-green-500 flex items-center justify-center gap-4 lg:gap-0 lg:flex-col" : "text-gray-300"}`}
          >
            <span>Shipping</span>
            <div className="mt-2 text-lg text-center">✅</div>
          </div>
        </>
      )}

      <>
        {step1 && step2 && step3 ? (
          <div className="hidden lg:block h-0.5 w-[10rem] bg-green-500"></div>
        ) : (
          ""
        )}

        <>
          <span
            className={`${!step3 ? "lg:ml-[10rem] text-gray-300 flex items-center justify-center gap-4 lg:gap-0 lg:flex-col" : "text-green-500"}`}
          >
            Summary
          </span>
          {step1 && step2 && step3 ? (
            <div className="mt-2 text-lg text-center">✅</div>
          ) : (
            ""
          )}
        </>
      </>
    </div>
  );
};

export default ProgressSteps;
