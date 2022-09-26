import GlobalStyles from "./GlobalStyles";
import data from "../data";
import TypeHead from "./Typehead";
import styled from "styled-components";

const App = (props) => {
  return (
    <Wrapper>
      <GlobalStyles />
      {/* TODO */}
      <TypeHead
        suggestions={data.books}
        handleSelect={(suggestion) => {
          window.alert(suggestion);
        }}
        categories={data.categories}
      />
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div`
  display: flex;
  /* border: 1px solid blue; */
  justify-content: center;
  align-items: center;

  margin-top: 10rem;
`;
