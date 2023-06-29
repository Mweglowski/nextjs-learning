"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [currentPosts, setCurrentPosts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);

    if (e.target.value === "") {
      setTimeout(() => {
        setCurrentPosts(allPosts);
      }, 500);
    }

    const filteredPosts = allPosts.filter(
      (p) =>
        p.prompt.indexOf(e.target.value) > -1 ||
        p.creator.username.indexOf(e.target.value) > -1 ||
        p.creator.email.indexOf(e.target.value) > -1 ||
        p.tag.indexOf(e.target.value) > -1
    );

    setTimeout(() => {
      setCurrentPosts(filteredPosts);
    }, 500);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setCurrentPosts(data);
      setAllPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={currentPosts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
