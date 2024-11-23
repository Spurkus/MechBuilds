"use client";
import { useState, useCallback, useRef, Fragment } from "react";
import { fetchKeyboardsWithPagination } from "@/src/helper/firestoreFunctions";
import { KeyboardType } from "@/src/types/keyboard";
import { HOME_PAGE_KEYBOARD_LIMIT } from "@/src/constants";
import { QueryDocumentSnapshot } from "firebase/firestore";
import DisplayKeyboard from "@/src/components/Keyboard/DisplayKeyboard/DisplayKeyboard";
import Loading from "@/src/components/General/Loading";

const Home = () => {
  const [keyboards, setKeyboards] = useState<(KeyboardType & { username: string })[]>([]);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Observer to load more keyboards when the user scrolls to the end
  const setObserverRef = useCallback(
    (node: HTMLDivElement | null) => {
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

      // Disconnect the observer from the previous element
      if (observerRef.current) observerRef.current.disconnect();

      // Create a new observer if there is a node to observe
      if (node && hasMore) {
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              loadMore();
            }
          },
          { threshold: 1.0 },
        );
        observer.observe(node);
        observerRef.current = observer;
      }
    },
    [hasMore, lastVisible, loading],
  );
  return (
    <>
      <div className="flex w-full flex-col items-center justify-center space-y-1">
        {keyboards.map((keyboard, index) => (
          <Fragment key={index}>
            <DisplayKeyboard username={keyboard.username} keyboard={keyboard} type={"KeyboardPage"} />
            {index < keyboards.length - 1 && <hr className="w-[40rem] border-t border-gray-700" />}
          </Fragment>
        ))}
        {loading && <Loading height={70} width={70} />}
        <div ref={setObserverRef} className="h-1" />
      </div>
    </>
  );
};

export default Home;
