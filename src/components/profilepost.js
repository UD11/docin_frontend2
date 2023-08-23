import React, { useState } from "react";
import { useEffect } from "react";
import { USER_POST_QUERY } from "../graphql";
import { useLazyQuery, useMutation } from "@apollo/client";
import List_custom from "./list";
import { UPVOTE_QUERY } from "../graphql";
import { DOWNVOTE_QUERY } from "../graphql";

const Card = ({ title, description, author, institution, link }) => {
  return (
    <div className="w-80 p-6 mt-24 border border-[#A7727D] rounded-lg mx-4 bg-[#F9F5E7] mb-4 shadow-md">
      <h2 className="text-lg font-semibold mb-2 text-[#A7727D] overflow-hidden whitespace-nowrap overflow-ellipsis">
        {title}
      </h2>
      <p className="text-sm text-gray-600 mb-4 overflow-hidden whitespace-nowrap overflow-ellipsis">
        {description}
      </p>
      <div className="flex flex-col">
        <p className="text-xs text-gray-500 mb-1">{author}</p>
        <p className="text-xs text-gray-500 mb-1">{institution}</p>
        <a
          className="text-xs text-[#A7727D] hover:underline"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Check Out
        </a>
      </div>
    </div>
  );
};

const CardList = () => {
  const userid = localStorage.getItem("userid");
  const [searchpdf, { data }] = useLazyQuery(USER_POST_QUERY);
  const [pdfs, setpdfs] = useState([]);
  const [upvotePdf, { loading: upvoteLoading, error: upvoteError }] =
    useMutation(UPVOTE_QUERY);
  const [downvotePdf, { loading: downvoteLoading, error: downvoteError }] =
    useMutation(DOWNVOTE_QUERY);

  useEffect(() => {
    const fetchData = async () => {
      await searchpdf();
    };

    fetchData();
  }, [searchpdf]);

  useEffect(() => {
    if (data && data.searchPdfsByUser) {
      console.log(data.searchPdfsByUser);
      setpdfs(data.searchPdfsByUser);
    }
  }, [data]);

  const handleUpvote = (id) => {
    upvotePdf({
      variables: { id: parseInt(id) },
    });
  };

  const handleDownvote = (id) => {
    console.log(parseInt(id));
    downvotePdf({
      variables: { id: parseInt(id) },
    });
  };

  return (
    <div className="flex flex-wrap justify-center p-4">
      {pdfs.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          description={card.description}
          author={card.author}
          institution={card.institution}
          link={card.link}
        />
      ))}
    </div>
    // <div className="w-full  bg-[#EDDBC7] p-4 flex justify-center">
    //   <div className="w-1/2 max-w-screen-xl p-8" >
    //     <div className="relative">
    //       <List_custom
    //         searchResults={pdfs}
    //         handleUpvote={handleUpvote}
    //         handleDownvote={handleDownvote}
    //       />
    //     </div>
    //   </div>
    // </div>
  );
};

export default CardList;
