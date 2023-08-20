import React from "react";

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
  const cardData = [
    {
      title: "Title 1 with a very long title that needs to be truncated",
      description:
        "Description 1 with a very long description that needs to be truncated",
      author: "Author 1",
      institution: "Institution 1",
      link: "https://example.com/1",
    },
    {
      title: "Title 2 with a very long title that needs to be truncated",
      description:
        "Description 2 with a very long description that needs to be truncated",
      author: "Author 2",
      institution: "Institution 2",
      link: "https://example.com/2",
    },
    {
      title: "Title 3 with a very long title that needs to be truncated",
      description:
        "Description 3 with a very long description that needs to be truncated",
      author: "Author 3",
      institution: "Institution 3",
      link: "https://example.com/3",
    },
    {
      title: "Title 4 with a very long title that needs to be truncated",
      description:
        "Description 4 with a very long description that needs to be truncated",
      author: "Author 4",
      institution: "Institution 4",
      link: "https://example.com/4",
    },
    // ... other card data
  ];

  return (
    <div className="flex flex-wrap justify-center p-4">
      {cardData.map((card, index) => (
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
  );
};

export default CardList;
