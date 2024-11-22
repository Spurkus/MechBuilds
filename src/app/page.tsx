"use client";
import { useState } from "react";
import { fetchKeyboardsWithPagination } from "@/src/helper/firestoreFunctions";
import { KeyboardType } from "@/src/types/keyboard";
import { HOME_PAGE_KEYBOARD_LIMIT } from "@/src/constants";
import { QueryDocumentSnapshot } from "firebase/firestore";
import DisplayKeyboard from "../components/Keyboard/DisplayKeyboard/DisplayKeyboard";
import Loading from "@/src/components/General/Loading";

const Home = () => {
  const [keyboards, setKeyboards] = useState<(KeyboardType & { username: string })[]>([]);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const {
      keyboards: newKeyboards,
      lastVisible: newLastVisible,
      hasMore: newHasMore,
    } = await fetchKeyboardsWithPagination(lastVisible, HOME_PAGE_KEYBOARD_LIMIT);

    setKeyboards((prev) => [...prev, ...newKeyboards]);
    setLastVisible(newLastVisible);
    setHasMore(newHasMore);

    setLoading(false);
  };

  return (
    <>
      <div className="flex w-full flex-col items-center">
        {keyboards.map((keyboard, index) => (
          <DisplayKeyboard key={index} username={keyboard.username} keyboard={keyboard} type={"KeyboardPage"} />
        ))}
        {loading && <Loading />}
        <button className="btn my-5" onClick={loadMore}>
          Load more
        </button>
      </div>
    </>
  );
};

export default Home;
