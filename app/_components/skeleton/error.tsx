import React from "react";

function DisplayError({ error }: { error: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      {error ? error : "Something bad happened 🤔"}
    </div>
  );
}

export default DisplayError;
