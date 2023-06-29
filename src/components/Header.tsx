"use client";
import Image from "next/image";
import {
  MagnifyingGlassIcon,
  MusicalNoteIcon,
  PencilSquareIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import Avatar from "react-avatar";
import { useBoardStore } from "@/store/BoardStore";
import Column from "./Column";
import { useEffect, useState } from "react";
import fetchSuggestion from "@/utils/fetchSuggestion";

function Header() {
  const [board, searchString, setSearchString] = useBoardStore((state) => [
    state.board,
    state.searchString,
    state.setSearchString,
  ]);
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState("");

  useEffect(() => {
    if (board.columns.size === 0) return;
    setLoading(true);

    const fetchSuggestionFunc = async () => {
      const suggestion = await fetchSuggestion(board);
      setSuggestion(suggestion);
      setLoading(false);
    };

    fetchSuggestionFunc();
  }, [board]);

  return (
    <header>
      <div className="flex flex-col md:flex-row items-center justify-between p-5 bg-gray-500/10 rounded-b-2xl">
        <div
          className="
        absolute 
        top-0 
        left-0
         w-full 
         h-96 
         bg-gradient-to-br
        from-[#ea898d]
        to-[#2f7dd1]
        rounded-md 
        filter
        blur-3xl
        opacity-50
        -z-50"
        />
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Trello-logo-blue.svg/2560px-Trello-logo-blue.svg.png"
          alt="logo_icon"
          height={100}
          width={300}
          className="w-44 md:w-56 pb-10 md:pb-0 object-contain"
        />
        <div className="flex flex-1 space-x-5 items-center justify-end w-full">
          <form className="flex p-2 bg-white rounded-md space-x-5 shadow-md flex-1 md:flex-initial ">
            <input
              type="text"
              className="flex-1 outline-none text-gray-400 p-2 w-max-md"
              placeholder="Search..."
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
            <MagnifyingGlassIcon className="w-8 h-8 text-gray-400" />
          </form>
          <Avatar
            name="Decole Mills"
            color="#0055D1"
            className="cursor-pointer rounded-full"
            size="50"
          />
        </div>
      </div>
      <div className="flex items-center justify-center px-5 py-2 md:py-5">
        <p className="flex items-center rounded-xl bg-white font-light w-fit shadow-xl p-5 max-w-3xl">
          <UserCircleIcon
            className={`inline-block p-2 h-20 mr-1 text-[#0055D1] ${
              loading && "animate-spin"
            }`}
          />
          {suggestion && !loading
            ? suggestion
            : " GPT is Summarizing your Tasks for today!"}
        </p>
      </div>
    </header>
  );
}

export default Header;
