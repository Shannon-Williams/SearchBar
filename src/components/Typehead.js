import styled from "styled-components";
import { useState } from "react";

const TypeHead = ({ suggestions, handleSelect, categories }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);
  const suggestedBookTitles = suggestions.map((sugg) => {
    return sugg.title;
  });

  const filterBookTitles = suggestions.filter((sugg) => {
    if (
      inputValue.length >= 2 &&
      sugg.title.toLowerCase().includes(inputValue.toLowerCase())
    ) {
      return sugg.length === 0 ? "" : sugg;
    }
  });

  return (
    <Wrapper>
      <StyledTypeHead>
        <StyledInput
          type={"text"}
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
          onKeyDown={(event) => {
            switch (event.key) {
              case "Enter": {
                handleSelect(filterBookTitles[selectedSuggestionIndex].title);
                return;
              }
              case "ArrowUp": {
                // TODO: Handle moving the selection up
                setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
                return;
              }
              case "ArrowDown": {
                // TODO: Handle moving the selection down
                setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
                return;
              }
            }
          }}
        />
        <StlyedButton onClick={() => setInputValue("")}>Clear</StlyedButton>
      </StyledTypeHead>
      <StyledSearchList>
        {filterBookTitles.map((sugg, i) => {
          const isSelected = i === selectedSuggestionIndex;
          const firstHalf = sugg.title.slice(
            0,
            sugg.title.toLowerCase().indexOf(inputValue) + inputValue.length
          );
          const secondHalf = sugg.title.slice(
            sugg.title.toLowerCase().indexOf(inputValue) + inputValue.length
          );

          // console.log(
          //   `the first half is ${firstHalf} the second half is ${secondHalf}`
          // );

          return (
            <Suggestion
              key={`${sugg.id}-${i}`}
              onClick={() => handleSelect(sugg.title)}
              style={{
                background: isSelected
                  ? "hsla(50deg, 100%, 80%, 0.25)"
                  : "transparent",
              }}
              onMouseEnter={() => {
                setSelectedSuggestionIndex(i);
              }}
            >
              <span>
                {firstHalf}
                <Prediction>{secondHalf}</Prediction> in{" "}
                <Categories>{categories[sugg.categoryId].name}</Categories>
              </span>
            </Suggestion>
          );
        })}
      </StyledSearchList>
    </Wrapper>
  );
};

export default TypeHead;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 650px;
  /* min-width: 100%; */
  /* margin: 0 auto; */
`;

const StyledTypeHead = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledInput = styled.input`
  height: 2rem;
  width: 400px;
  border-radius: 3px;
  border: 1.5px solid lightgray;

  &:focus {
    border-radius: 5px;
    border: 1px solid gray;
  }
`;

const StlyedButton = styled.button`
  border: none;
  background-color: #2701d1;
  color: white;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const StyledSearchList = styled.ul`
  display: flex;
  flex-direction: column;
  /* border: 1px solid gray; */
  width: 480px;
  margin-top: 0.5rem;
  align-items: center;
  border-radius: 4px;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.3);
`;

const Suggestion = styled.li`
  width: 470px;
  padding: 0.5rem 0.75rem;
  margin-top: 0.25rem;
  margin-bottom: 0.5rem;
  line-height: 1.2;

  &:hover {
    /* background-color: #fffae4; */
    cursor: pointer;
  }
`;

const Prediction = styled.span`
  font-weight: bold;
`;

//#ad83af
const Categories = styled.span`
  font-style: italic;
  color: #ad83af;
`;
