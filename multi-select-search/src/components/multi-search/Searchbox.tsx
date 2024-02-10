import React, { useEffect, useState } from "react";
import useDeboucedHook from "../../hooks/useDeboucedHook";

interface ApiResponse {
  email: string;
  id: string;
  image: string;
  username: string;
  firstName: string;
  lastName: string;
}

const Searchbox = () => {
  const [loading, setLoading] = useState(false);
  const [searchedText, setSearchedText] = useState("");
  const [receivedLists, setReceivedLists] = useState<ApiResponse[]>([]);
  const [selectedLists, setSelectedLists] = useState<ApiResponse[]>([]);
  const [selectedListsSet, setSelectedListsSet] = useState<Set<string>>(
    new Set([])
  );
  const debouncedValue = useDeboucedHook(searchedText, 500);

  // HANDLE INPUT CHANGE
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedText(e.target.value);
  };

  // HANDLE ON USER/OPTION CLICK
  const handleSelectTrigger = (selectedUser: ApiResponse) => {
    setSearchedText("");
    setSelectedLists((prevList) => [...prevList, selectedUser]);
    setSelectedListsSet(
      (prevList) => new Set([...prevList, selectedUser.email])
    );
  };

  // HANDLE USER DELETE
  const handleUserDelete = (selectedUser: ApiResponse) => {
    setSelectedLists((prevList) =>
      prevList.filter((single) => single.id !== selectedUser.id)
    );
    selectedListsSet.delete(selectedUser.email);
    setSelectedListsSet(selectedListsSet);
  };

  // HANDLE USER DELETE ON BACKSPACE
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (
      e.key === "Backspace" &&
      target.value === "" &&
      selectedLists.length > 0
    ) {
      const lastUser = selectedLists.pop() as ApiResponse;
      handleUserDelete(lastUser);
    }
  };

  useEffect(() => {
    if (!searchedText) {
      setReceivedLists([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const abortController = new AbortController();
    const signal = abortController.signal;

    (() => {
      fetch(`https://dummyjson.com/users/search?q=${debouncedValue}`, {
        signal: signal,
      })
        .then((data) => {
          return data.json() as Promise<any>;
        })
        .then((results) => {
          setReceivedLists(results.users);
          setLoading(false);
        })
        .catch((err) => {
          setReceivedLists([]);
          setLoading(false);
        });
    })();

    return () => {
      abortController.abort();
    };
  }, [debouncedValue]);

  return (
    <section className="space-y-2">
      <div>
        <div className="space-y-2">
          <label htmlFor="namebar">Search the user 🫣...</label>
          <div className="w-full border rounded-md outline-none p-2 flex space-x-1 flex-wrap">
            <div className="flex space-x-1 flex-wrap">
              {selectedLists?.map((single, index) => {
                return (
                  <li
                    key={single.id}
                    className="bg-black text-white flex-wrap flex items-center justify-between px-4 py-1 text-sm space-x-2 rounded-md"
                  >
                    <div className="">
                      {
                        <img
                          src={single.image}
                          className="max-w-[10px]"
                          alt={single.username}
                        />
                      }
                    </div>
                    <div>
                      <p>
                        {single.firstName} {single.lastName}
                      </p>
                    </div>
                    <div>
                      <button
                        className="text-red-600"
                        onClick={() => {
                          handleUserDelete(single);
                        }}
                      >
                        ❌
                      </button>
                    </div>
                  </li>
                );
              })}
            </div>
            <input
              type="text"
              id="namebar"
              placeholder="Enter user name..."
              className="px-4 py-3 outline-none inline-block"
              autoComplete="off"
              value={searchedText}
              onKeyDown={(e) => {
                handleInputKeyDown(e);
              }}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <ul className="max-h-[400px] overflow-y-auto">
        {loading
          ? "Loading..."
          : receivedLists?.map((single, index) => {
              return (
                !selectedListsSet.has(single.email) && (
                  <li
                    key={index}
                    onClick={() => {
                      handleSelectTrigger(single);
                    }}
                    className="bg-green-50 border-b border-green-200 flex items-center justify-between p-5"
                  >
                    <div className="">
                      {
                        <img
                          src={single.image}
                          className="max-w-[40px]"
                          alt={single.username}
                        />
                      }
                    </div>
                    <div>
                      <p>
                        {single.firstName} {single.lastName}
                      </p>
                    </div>
                  </li>
                )
              );
            })}
      </ul>
    </section>
  );
};

export default Searchbox;
